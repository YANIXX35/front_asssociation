import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-force-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './force-change-password.html',
  styleUrl: './force-change-password.scss',
})
export class ForceChangePassword {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', Validators.required],
  });

  loading = false;
  errorMessage = '';

  submit(): void {
    const { new_password, confirm_password } = this.form.getRawValue();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (new_password !== confirm_password) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.auth.forceChangePassword(new_password!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([this.auth.isBureau() ? '/bureau' : '/tableau-de-bord']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Une erreur est survenue.';
      },
    });
  }
}
