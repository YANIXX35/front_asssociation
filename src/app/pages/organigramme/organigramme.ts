import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../core/services/organigramme.service';
import { Poste } from '../../core/models/organigramme.model';
import { DIRECTION_LABELS } from '../../core/models/user.model';

@Component({
  selector: 'app-organigramme',
  imports: [],
  templateUrl: './organigramme.html',
  styleUrl: './organigramme.scss',
})
export class Organigramme implements OnInit {
  presidence: Poste[] = [];
  directions: Poste[] = [];
  selected: Poste | null = null;
  directionLabels = DIRECTION_LABELS;

  constructor(private organigrammeService: OrganigrammeService) {}

  ngOnInit(): void {
    this.organigrammeService.getPostes().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      this.presidence = list.filter((p) => p.niveau === 1);
      this.directions = list.filter((p) => p.niveau === 2);
    });
  }

  select(poste: Poste): void {
    this.selected = this.selected?.id === poste.id ? null : poste;
  }
}
