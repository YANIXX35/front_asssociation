import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, DashboardNav],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  public auth = inject(AuthService);

  profileForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
  });

  passwordForm = this.fb.group({
    old_password: ['', Validators.required],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  profileMessage = '';
  passwordMessage = '';
  passwordError = '';

  ngOnInit(): void {
    this.auth.refreshProfile().subscribe((user) => {
      this.profileForm.patchValue({ nom: user.nom, prenom: user.prenom });
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.profileMessage = '';
    this.auth.updateProfile(this.profileForm.getRawValue() as any).subscribe(() => {
      this.profileMessage = 'Profil mis à jour.';
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    const { old_password, new_password } = this.passwordForm.getRawValue();
    this.passwordMessage = '';
    this.passwordError = '';
    this.auth.changePassword(old_password!, new_password!).subscribe({
      next: (res) => {
        this.passwordMessage = res.detail;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.passwordError = err?.error?.old_password || 'Une erreur est survenue.';
      },
    });
  }
}
