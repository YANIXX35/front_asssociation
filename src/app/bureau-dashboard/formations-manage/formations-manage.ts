import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { FormationService } from '../../core/services/formation.service';
import { Formation } from '../../core/models/formation.model';

@Component({
  selector: 'app-formations-manage',
  imports: [BureauNav, RouterLink],
  templateUrl: './formations-manage.html',
  styleUrl: './formations-manage.scss',
})
export class FormationsManage implements OnInit {
  formations: Formation[] = [];
  loading = true;

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.formationService.getFormations().subscribe((res) => {
      this.formations = res.results;
      this.loading = false;
    });
  }

  remove(formation: Formation): void {
    if (!confirm(`Supprimer la formation "${formation.titre}" ?`)) return;
    this.formationService.deleteFormation(formation.id).subscribe(() => this.load());
  }
}
