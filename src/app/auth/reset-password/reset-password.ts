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
    new_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  uid = '';
  token = '';
  loading = false;
  message = '';
  errorMessage = '';

  ngOnInit(): void {
    this.uid = this.route.snapshot.queryParamMap.get('uid') ?? '';
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.auth.resetPassword(this.uid, this.token, this.form.getRawValue().new_password!).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.detail;
        setTimeout(() => this.router.navigate(['/connexion']), 1500);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Lien invalide ou expiré.';
      },
    });
  }
}
