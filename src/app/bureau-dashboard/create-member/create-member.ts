import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminUserService, CreateMemberResponse } from '../../core/services/admin-user.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { DIRECTION_LABELS, Direction } from '../../core/models/user.model';

@Component({
  selector: 'app-create-member',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './create-member.html',
  styleUrl: './create-member.scss',
})
export class CreateMember implements OnInit {
  private fb = inject(FormBuilder);
  private adminUserService = inject(AdminUserService);
  private route = inject(ActivatedRoute);

  directionLabels = DIRECTION_LABELS;
  directions = Object.keys(DIRECTION_LABELS) as Direction[];

  form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    matricule_cesci: ['', Validators.required],
    role: ['etudiant_membre' as 'membre_bureau' | 'etudiant_membre', Validators.required],
    direction: [null as string | null],
  });

  loading = false;
  errorMessage = '';
  result: CreateMemberResponse | null = null;

  ngOnInit(): void {
    const { nom, email } = this.route.snapshot.queryParams;
    if (nom || email) {
      this.form.patchValue({ nom: nom ?? '', email: email ?? '' });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.result = null;
    this.adminUserService.createMember(this.form.getRawValue() as any).subscribe({
      next: (res) => {
        this.loading = false;
        this.result = res;
        this.form.reset({ role: 'etudiant_membre', direction: null });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.email?.[0] || err?.error?.matricule_cesci?.[0] || 'Erreur lors de la création du compte.';
      },
    });
  }
}
