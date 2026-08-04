import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormationService } from '../../core/services/formation.service';
import { AuthService } from '../../core/services/auth.service';
import { Formation } from '../../core/models/formation.model';

@Component({
  selector: 'app-formation-detail',
  imports: [RouterLink],
  templateUrl: './formation-detail.html',
  styleUrl: './formation-detail.scss',
})
export class FormationDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formationService = inject(FormationService);
  public auth = inject(AuthService);

  formation: Formation | null = null;
  enrolling = false;
  enrolled = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormation(id).subscribe((formation) => (this.formation = formation));
  }

  enroll(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return;
    }
    if (!this.formation) return;
    this.enrolling = true;
    this.errorMessage = '';
    this.formationService.enroll(this.formation.id).subscribe({
      next: () => {
        this.enrolling = false;
        this.enrolled = true;
        this.router.navigate(['/tableau-de-bord/mes-formations']);
      },
      error: (err) => {
        this.enrolling = false;
        this.errorMessage = err?.error?.detail || 'Inscription impossible.';
      },
    });
  }
}
