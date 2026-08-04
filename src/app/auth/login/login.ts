import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    matricule_cesci: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = false;
  errorMessage = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const { email, matricule_cesci, password } = this.form.getRawValue();
    this.auth.login(email!, matricule_cesci!, password!).subscribe({
      next: () => {
        this.loading = false;
        if (this.auth.mustChangePassword()) {
          this.router.navigate(['/changer-mot-de-passe']);
        } else {
          this.router.navigate([this.auth.isBureau() ? '/bureau' : '/tableau-de-bord']);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Matricule, email ou mot de passe incorrect.';
      },
    });
  }
}
