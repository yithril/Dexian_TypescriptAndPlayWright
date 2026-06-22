import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly submitted = signal(false);
  protected readonly error = signal('');
  protected readonly pending = signal(false);

  get usernameInvalid(): boolean {
    return this.submitted() && this.username().trim() === '';
  }

  get passwordInvalid(): boolean {
    return this.submitted() && this.password().trim() === '';
  }

  async submit(): Promise<void> {
    this.submitted.set(true);
    this.error.set('');
    if (this.usernameInvalid || this.passwordInvalid) {
      return;
    }
    this.pending.set(true);
    const ok = await this.auth.login(this.username().trim(), this.password());
    this.pending.set(false);
    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Invalid username or password.');
    }
  }
}
