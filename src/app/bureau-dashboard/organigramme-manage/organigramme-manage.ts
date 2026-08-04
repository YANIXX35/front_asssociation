import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganigrammeService } from '../../core/services/organigramme.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { Poste } from '../../core/models/organigramme.model';
import { DIRECTION_LABELS, Direction } from '../../core/models/user.model';

@Component({
  selector: 'app-organigramme-manage',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './organigramme-manage.html',
  styleUrl: './organigramme-manage.scss',
})
export class OrganigrammeManage implements OnInit {
  private fb = inject(FormBuilder);
  private organigrammeService = inject(OrganigrammeService);

  postes: Poste[] = [];
  directionLabels = DIRECTION_LABELS;
  directions = Object.keys(DIRECTION_LABELS) as Direction[];

  posteForm = this.fb.group({
    titre: ['', Validators.required],
    niveau: [2, Validators.required],
    direction: [null as string | null],
    description_role: [''],
    commissions_rattachees: [''],
  });

  titulaireForms: Record<number, ReturnType<FormBuilder['group']>> = {};

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.organigrammeService.getPostes().subscribe((res) => {
      this.postes = Array.isArray(res) ? res : res.results;
      this.postes.forEach((poste) => {
        this.titulaireForms[poste.id] = this.fb.group({
          nom_affiche: [''],
          date_debut: [new Date().toISOString().slice(0, 10)],
        });
      });
    });
  }

  addPoste(): void {
    if (this.posteForm.invalid) return;
    this.organigrammeService.createPoste(this.posteForm.getRawValue() as any).subscribe(() => {
      this.posteForm.reset({ titre: '', niveau: 2, direction: null, description_role: '', commissions_rattachees: '' });
      this.load();
    });
  }

  removePoste(poste: Poste): void {
    if (!confirm(`Supprimer le poste "${poste.titre}" ?`)) return;
    this.organigrammeService.deletePoste(poste.id).subscribe(() => this.load());
  }

  assignTitulaire(poste: Poste): void {
    const raw = this.titulaireForms[poste.id].getRawValue();
    if (!raw['nom_affiche']) return;

    const endCurrent$ = poste.titulaire_actuel
      ? this.organigrammeService.endTitulaire(poste.titulaire_actuel.id, raw['date_debut'] as string)
      : null;

    const createNew = () =>
      this.organigrammeService
        .createTitulaire({ poste: poste.id, nom_affiche: raw['nom_affiche'] as string, date_debut: raw['date_debut'] as string })
        .subscribe(() => this.load());

    if (endCurrent$) {
      endCurrent$.subscribe(() => createNew());
    } else {
      createNew();
    }
  }
}
