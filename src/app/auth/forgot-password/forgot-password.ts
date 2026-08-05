import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  loading = false;
  message = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const emailVal = this.form.getRawValue().email!;
    this.auth.forgotPassword(emailVal).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = "Un e-mail contenant un code OTP de réinitialisation a été envoyé.";
        setTimeout(() => {
          this.router.navigate(['/reinitialiser-mot-de-passe'], { queryParams: { email: emailVal } });
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.message = "Si ce compte existe, un e-mail a été envoyé.";
        setTimeout(() => {
          this.router.navigate(['/reinitialiser-mot-de-passe'], { queryParams: { email: emailVal } });
        }, 3000);
      },
    });
  }
}
