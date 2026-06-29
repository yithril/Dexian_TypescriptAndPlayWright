import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="site-footer" data-testid="site-footer">
      <div class="site-footer__cols">
        <div class="site-footer__brand">
          <span class="site-footer__logo">
            <i class="fa-solid fa-book-open" aria-hidden="true"></i>
            PageTurner
          </span>
          <p>PageTurner Books - a fictional shop for the Playwright workshop.</p>
        </div>
        <nav class="site-footer__links" aria-label="Footer">
          <h3>Explore</h3>
          <a href="#">New arrivals</a>
          <a href="#">Best sellers</a>
          <a href="#">Gift cards</a>
        </nav>
        <nav class="site-footer__links" aria-label="Help">
          <h3>Help</h3>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact us</a>
        </nav>
        <div class="site-footer__social">
          <h3>Follow</h3>
          <div class="site-footer__icons">
            <a href="#" aria-label="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
            <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      <p class="site-footer__legal">
        <i class="fa-regular fa-copyright" aria-hidden="true"></i>
        PageTurner Books - built for the Playwright workshop.
      </p>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        border-top: 1px solid var(--pt-line);
        background: var(--pt-paper-deep);
        color: var(--pt-ink-soft);
        font-size: 0.85rem;
        padding: 2rem 1.25rem 1.25rem;
      }
      .site-footer__cols {
        max-width: 1120px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 1.5rem;
      }
      .site-footer__logo {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Fraunces', Georgia, serif;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--pt-forest-deep);
      }
      .site-footer__brand p {
        margin: 0.5rem 0 0;
        max-width: 36ch;
      }
      .site-footer__links {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .site-footer h3 {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--pt-ink);
        margin: 0 0 0.3rem;
      }
      .site-footer__links a {
        color: var(--pt-ink-soft);
      }
      .site-footer__links a:hover {
        color: var(--pt-forest-deep);
      }
      .site-footer__icons {
        display: flex;
        gap: 0.65rem;
        font-size: 1.1rem;
      }
      .site-footer__icons a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 50%;
        background: var(--pt-white);
        color: var(--pt-forest-deep);
        transition: transform 0.12s ease, color 0.12s ease;
      }
      .site-footer__icons a:hover {
        color: var(--pt-clay);
        transform: translateY(-2px);
      }
      .site-footer__legal {
        max-width: 1120px;
        margin: 1.5rem auto 0;
        padding-top: 1rem;
        border-top: 1px solid var(--pt-line);
        text-align: center;
      }
      @media (max-width: 720px) {
        .site-footer__cols {
          grid-template-columns: 1fr 1fr;
        }
      }
    `
  ]
})
export class SiteFooter {}
