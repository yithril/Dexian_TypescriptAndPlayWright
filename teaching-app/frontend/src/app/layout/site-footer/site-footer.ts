import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="site-footer" data-testid="site-footer">
      <p>PageTurner Books - a fictional shop for the Playwright workshop.</p>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        border-top: 1px solid var(--pt-line);
        background: var(--pt-paper-deep);
        color: var(--pt-ink-soft);
        text-align: center;
        font-size: 0.85rem;
        padding: 1.25rem;
      }
      .site-footer p {
        margin: 0;
      }
    `
  ]
})
export class SiteFooter {}
