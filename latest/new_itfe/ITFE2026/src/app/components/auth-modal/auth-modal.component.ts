import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html'
})
export class AuthModalComponent {
  errorMessage: string | null = null;
  authForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  switchMode(mode: 'login' | 'signup'): void {
    this.errorMessage = null;
    this.auth.openModal(mode);
  }

  close(): void {
    this.errorMessage = null;
    this.auth.closeModal();
  }

  submit(): void {
    this.errorMessage = null;
    const mode = this.auth.authModalMode;
    const { name, email, password } = this.authForm.value;

    if (!email || !email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!password || password.length < 4) {
      this.errorMessage = 'Please enter a password (at least 4 characters).';
      return;
    }

    if (mode === 'signup' && (!name || !name.trim())) {
      this.errorMessage = 'Please enter your name to create your account.';
      return;
    }

    const derivedName =
      (name && name.trim()) ||
      email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

    this.auth.login({
      name: derivedName,
      email: email.trim()
    });
    this.authForm.reset();
  }

  demoLogin(): void {
    this.errorMessage = null;
    this.authForm.reset();
    this.auth.loginWithDemo();
  }
}