import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormationService } from '../../core/services/formation.service';
import { AuthService } from '../../core/services/auth.service';
import { Formation } from '../../core/models/formation.model';
import { DIRECTION_LABELS, Direction } from '../../core/models/user.model';

@Component({
  selector: 'app-formation-catalog',
  imports: [FormsModule, RouterLink, SlicePipe],
  templateUrl: './formation-catalog.html',
  styleUrl: './formation-catalog.scss',
})
export class FormationCatalog implements OnInit {
  formations: Formation[] = [];
  search = '';
  direction = '';
  niveau = '';
  loading = false;
  directionLabels = DIRECTION_LABELS;
  directions = Object.keys(DIRECTION_LABELS) as Direction[];

  constructor(
    private formationService: FormationService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.formationService
      .getFormations({ search: this.search, direction: this.direction, niveau: this.niveau })
      .subscribe({
        next: (res) => {
          this.formations = res.results;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }
}
