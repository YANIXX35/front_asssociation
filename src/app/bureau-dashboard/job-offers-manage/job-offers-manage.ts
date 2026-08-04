import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobOfferService } from '../../core/services/job-offer.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { Application, JobOffer } from '../../core/models/job-offer.model';

@Component({
  selector: 'app-job-offers-manage',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './job-offers-manage.html',
  styleUrl: './job-offers-manage.scss',
})
export class JobOffersManage implements OnInit {
  private fb = inject(FormBuilder);
  private jobOfferService = inject(JobOfferService);

  offers: JobOffer[] = [];
  applications: Application[] = [];

  form = this.fb.group({
    titre: ['', Validators.required],
    entreprise: ['', Validators.required],
    type_contrat: ['stage', Validators.required],
    description: [''],
    date_limite: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.jobOfferService.getOffers().subscribe((res) => (this.offers = res.results));
    this.jobOfferService.getApplications().subscribe((res) => (this.applications = res.results));
  }

  submit(): void {
    if (this.form.invalid) return;
    this.jobOfferService.createOffer(this.form.getRawValue() as any).subscribe(() => {
      this.form.reset({ type_contrat: 'stage' });
      this.load();
    });
  }

  remove(offer: JobOffer): void {
    if (!confirm(`Supprimer l'offre "${offer.titre}" ?`)) return;
    this.jobOfferService.deleteOffer(offer.id).subscribe(() => this.load());
  }

  applicationsFor(offerId: number): Application[] {
    return this.applications.filter((a) => a.offer === offerId);
  }

  updateStatus(application: Application, statut: string): void {
    this.jobOfferService.updateApplicationStatus(application.id, statut).subscribe(() => this.load());
  }
}
