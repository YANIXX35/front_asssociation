import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOfferService } from '../../core/services/job-offer.service';
import { AuthService } from '../../core/services/auth.service';
import { JobOffer } from '../../core/models/job-offer.model';

@Component({
  selector: 'app-job-offer-detail',
  imports: [DatePipe],
  templateUrl: './job-offer-detail.html',
  styleUrl: './job-offer-detail.scss',
})
export class JobOfferDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobOfferService = inject(JobOfferService);
  public auth = inject(AuthService);

  offer: JobOffer | null = null;
  applying = false;
  applied = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobOfferService.getOffer(id).subscribe((offer) => (this.offer = offer));
  }

  apply(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return;
    }
    if (!this.offer) return;
    this.applying = true;
    this.errorMessage = '';
    this.jobOfferService.apply(this.offer.id).subscribe({
      next: () => {
        this.applying = false;
        this.applied = true;
      },
      error: (err) => {
        this.applying = false;
        this.errorMessage = err?.error?.detail || 'Candidature impossible.';
      },
    });
  }
}
