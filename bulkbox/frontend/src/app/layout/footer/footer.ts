import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>BulkBox is a fictional store built for the TypeScript &amp; Playwright workshop.</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--bb-ink);
        color: #aeb8c8;
        text-align: center;
        padding: 1.25rem;
        font-size: 0.85rem;
      }
    `
  ]
})
export class Footer {}
