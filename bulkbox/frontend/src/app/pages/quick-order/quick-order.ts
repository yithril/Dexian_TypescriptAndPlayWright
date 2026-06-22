import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

interface CalendarDay {
  iso: string;
  day: number;
}

interface ParsedRow {
  model: string;
  quantity: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

@Component({
  selector: 'app-quick-order',
  imports: [],
  templateUrl: './quick-order.html',
  styleUrl: './quick-order.css'
})
export class QuickOrder {
  private productService = inject(ProductService);

  // --- Cascading category -> subcategory ----------------------------------
  protected readonly categories = toSignal(this.productService.getCategories(), {
    initialValue: []
  });
  protected readonly selectedCategory = signal('');
  protected readonly selectedSubcategory = signal('');
  protected readonly subcategories = computed(() => {
    const cat = this.categories().find((c) => c.slug === this.selectedCategory());
    return cat ? cat.subcategories : [];
  });

  onCategoryChange(slug: string): void {
    this.selectedCategory.set(slug);
    // Reset the dependent control whenever its parent changes.
    this.selectedSubcategory.set('');
  }

  // --- Delivery date picker -----------------------------------------------
  private readonly today = new Date();
  protected readonly viewYear = signal(this.today.getFullYear());
  protected readonly viewMonth = signal(this.today.getMonth());
  protected readonly calendarOpen = signal(false);
  protected readonly selectedDate = signal('');

  protected readonly monthLabel = computed(
    () => `${MONTH_NAMES[this.viewMonth()]} ${this.viewYear()}`
  );

  protected readonly calendarDays = computed<CalendarDay[]>(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const count = new Date(year, month + 1, 0).getDate();
    const mm = String(month + 1).padStart(2, '0');
    return Array.from({ length: count }, (_, i) => {
      const day = i + 1;
      return { day, iso: `${year}-${mm}-${String(day).padStart(2, '0')}` };
    });
  });

  toggleCalendar(): void {
    this.calendarOpen.update((v) => !v);
  }

  previousMonth(): void {
    this.shiftMonth(-1);
  }

  nextMonth(): void {
    this.shiftMonth(1);
  }

  private shiftMonth(delta: number): void {
    const date = new Date(this.viewYear(), this.viewMonth() + delta, 1);
    this.viewYear.set(date.getFullYear());
    this.viewMonth.set(date.getMonth());
  }

  pickDate(iso: string): void {
    this.selectedDate.set(iso);
    this.calendarOpen.set(false);
  }

  // --- Product autocomplete (async typeahead) -----------------------------
  private readonly allProducts = toSignal(this.productService.getProducts(), {
    initialValue: [] as Product[]
  });
  protected readonly query = signal('');
  protected readonly suggestions = signal<Product[]>([]);
  protected readonly chosenProduct = signal('');
  private debounce?: ReturnType<typeof setTimeout>;

  onQueryInput(value: string): void {
    this.query.set(value);
    this.chosenProduct.set('');
    clearTimeout(this.debounce);
    const term = value.trim().toLowerCase();
    if (term === '') {
      this.suggestions.set([]);
      return;
    }
    // Debounced to mimic a real async typeahead hitting a backend.
    this.debounce = setTimeout(() => {
      const matches = this.allProducts()
        .filter(
          (p) =>
            p.name.toLowerCase().includes(term) || p.model.toLowerCase().includes(term)
        )
        .slice(0, 6);
      this.suggestions.set(matches);
    }, 200);
  }

  chooseSuggestion(product: Product): void {
    this.chosenProduct.set(`${product.model} - ${product.name}`);
    this.query.set(product.name);
    this.suggestions.set([]);
  }

  // --- Bulk upload + template download ------------------------------------
  protected readonly parsedRows = signal<ParsedRow[]>([]);
  protected readonly uploadError = signal('');

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploadError.set('');
    const text = await file.text();
    const rows: ParsedRow[] = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '' && !/^model/i.test(line))
      .map((line) => {
        const [model, qty] = line.split(',');
        return { model: model?.trim() ?? '', quantity: Number(qty) || 0 };
      })
      .filter((row) => row.model !== '');
    if (rows.length === 0) {
      this.uploadError.set('No valid rows found in the file.');
    }
    this.parsedRows.set(rows);
  }

  downloadTemplate(): void {
    const csv = 'model,quantity\nS-4612,10\nS-423,5\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bulk-order-template.csv';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}
