import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormationService } from '../../core/services/formation.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { Enrollment } from '../../core/models/formation.model';

@Component({
  selector: 'app-mes-formations',
  imports: [RouterLink, DashboardNav],
  templateUrl: './mes-formations.html',
  styleUrl: './mes-formations.scss',
})
export class MesFormations implements OnInit {
  enrollments: Enrollment[] = [];
  loading = true;
  downloadingId: number | null = null;

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formationService.getMyFormations().subscribe({
      next: (res) => {
        this.enrollments = res.results;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  downloadAttestation(enrollment: Enrollment): void {
    this.downloadingId = enrollment.formation;
    this.formationService.downloadAttestation(enrollment.formation).subscribe({
      next: (blob) => {
        this.downloadingId = null;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `attestation_${enrollment.formation_detail.titre}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => (this.downloadingId = null),
    });
  }
}
