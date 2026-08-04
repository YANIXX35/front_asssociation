import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdhesionService } from '../../core/services/adhesion.service';

@Component({
  selector: 'app-adhesion',
  imports: [ReactiveFormsModule],
  templateUrl: './adhesion.html',
  styleUrl: './adhesion.scss',
})
export class Adhesion {
  private fb = inject(FormBuilder);
  private adhesionService = inject(AdhesionService);

  form = this.fb.group({
    noms_prenoms: ['', Validators.required],
    whatsapp: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    niveau_etude: ['', Validators.required],
    niveau_etude_autre: [''],
    filiere_etablissement: ['', Validators.required],
  });

  loading = false;
  success = false;
  errorMessage = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.adhesionService.submit(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
      },
    });
  }
}
