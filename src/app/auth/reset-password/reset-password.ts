import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    otp_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loading = false;
  message = '';
  errorMessage = '';

  ngOnInit(): void {
    const emailParam = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.form.patchValue({ email: emailParam });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const val = this.form.getRawValue();
    this.auth.resetPassword(val.email!, val.otp_code!, val.new_password!).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.detail;
        setTimeout(() => this.router.navigate(['/connexion']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.detail || 'Le code OTP ou l\'email est invalide ou expiré.';
      },
    });
  }
}
