import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { FormationService } from '../../core/services/formation.service';
import { Lesson } from '../../core/models/formation.model';
import { DIRECTION_LABELS, Direction } from '../../core/models/user.model';

@Component({
  selector: 'app-formation-form',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './formation-form.html',
  styleUrl: './formation-form.scss',
})
export class FormationForm implements OnInit {
  private fb = inject(FormBuilder);
  private formationService = inject(FormationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formationId: number | null = null;
  lessons: Lesson[] = [];
  imageFile: File | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  directionLabels = DIRECTION_LABELS;
  directions = Object.keys(DIRECTION_LABELS) as Direction[];

  form = this.fb.group({
    titre: ['', Validators.required],
    description: [''],
    direction_organisatrice: [null as string | null],
    niveau: ['debutant', Validators.required],
    duree_heures: [0],
    type_attestation: [''],
    places_disponibles: [0],
    actif: [true],
  });

  lessonForm = this.fb.group({
    titre: ['', Validators.required],
    type: ['video', Validators.required],
    video_url: [''],
    contenu_texte: [''],
  });
  lessonFile: File | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.formationId = Number(idParam);
      this.formationService.getFormation(this.formationId).subscribe((formation) => {
        this.form.patchValue({
          titre: formation.titre,
          description: formation.description,
          direction_organisatrice: formation.direction_organisatrice,
          niveau: formation.niveau,
          duree_heures: formation.duree_heures,
          type_attestation: formation.type_attestation,
          places_disponibles: formation.places_disponibles,
          actif: formation.actif,
        });
        this.lessons = formation.lessons ?? [];
      });
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.[0] ?? null;
  }

  onLessonFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.lessonFile = input.files?.[0] ?? null;
  }

  private buildFormData(): FormData {
    const raw = this.form.getRawValue();
    const formData = new FormData();
    Object.entries(raw).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    return formData;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const formData = this.buildFormData();

    const request$ = this.formationId
      ? this.formationService.updateFormationForm(this.formationId, formData)
      : this.formationService.createFormationForm(formData);

    request$.subscribe({
      next: (formation) => {
        this.loading = false;
        this.successMessage = 'Formation enregistrée.';
        if (!this.formationId) {
          this.router.navigate(['/bureau/formations', formation.id, 'modifier']);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erreur lors de l'enregistrement de la formation.";
      },
    });
  }

  addLesson(): void {
    if (!this.formationId || this.lessonForm.invalid) return;
    const raw = this.lessonForm.getRawValue();
    const formData = new FormData();
    formData.append('formation', String(this.formationId));
    formData.append('titre', raw.titre!);
    formData.append('type', raw.type!);
    formData.append('ordre', String(this.lessons.length + 1));
    if (raw.video_url) formData.append('video_url', raw.video_url);
    if (raw.contenu_texte) formData.append('contenu_texte', raw.contenu_texte);
    if (this.lessonFile) formData.append('fichier', this.lessonFile);

    this.formationService.createLessonForm(formData).subscribe((lesson) => {
      this.lessons = [...this.lessons, lesson];
      this.lessonForm.reset({ titre: '', type: 'video', video_url: '', contenu_texte: '' });
      this.lessonFile = null;
    });
  }

  removeLesson(lesson: Lesson): void {
    if (!confirm(`Supprimer la leçon "${lesson.titre}" ?`)) return;
    this.formationService.deleteLesson(lesson.id).subscribe(() => {
      this.lessons = this.lessons.filter((l) => l.id !== lesson.id);
    });
  }
}
