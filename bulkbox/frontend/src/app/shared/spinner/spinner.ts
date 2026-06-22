import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner" role="status" data-testid="loading-spinner">
      <span class="spinner__ring" aria-hidden="true"></span>
      <span class="spinner__label">{{ label() }}</span>
    </div>
  `,
  styles: [
    `
      .spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.85rem;
        padding: 3rem 1rem;
        color: var(--bb-ink-soft);
      }
      .spinner__ring {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 4px solid var(--bb-line);
        border-top-color: var(--bb-yellow-dark);
        animation: spinner-rotate 0.8s linear infinite;
      }
      .spinner__label {
        font-size: 0.92rem;
        font-weight: 600;
      }
      @keyframes spinner-rotate {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spinner__ring {
          animation-duration: 2s;
        }
      }
    `
  ]
})
export class Spinner {
  readonly label = input('Loading...');
}
