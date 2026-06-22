import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class SignIn {
  private account = inject(AccountService);
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
    const ok = await this.account.signIn(this.username().trim(), this.password());
    this.pending.set(false);
    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.error.set('We could not find an account with those details.');
    }
  }
}
