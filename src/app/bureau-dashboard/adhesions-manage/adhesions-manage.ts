import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdhesionService } from '../../core/services/adhesion.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { MembershipApplication, NIVEAU_ETUDE_LABELS } from '../../core/models/adhesion.model';

@Component({
  selector: 'app-adhesions-manage',
  imports: [BureauNav, DatePipe],
  templateUrl: './adhesions-manage.html',
  styleUrl: './adhesions-manage.scss',
})
export class AdhesionsManage implements OnInit {
  private adhesionService = inject(AdhesionService);
  private router = inject(Router);

  applications: MembershipApplication[] = [];
  niveauLabels = NIVEAU_ETUDE_LABELS;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adhesionService.list().subscribe((res) => (this.applications = res.results));
  }

  updateStatus(application: MembershipApplication, statut: string): void {
    this.adhesionService.updateStatus(application.id, statut).subscribe(() => this.load());
  }

  createAccount(application: MembershipApplication): void {
    this.router.navigate(['/bureau/creer-membre'], {
      queryParams: { nom: application.noms_prenoms, email: application.email },
    });
  }
}
