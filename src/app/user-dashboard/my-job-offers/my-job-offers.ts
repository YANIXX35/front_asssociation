import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOfferService } from '../../core/services/job-offer.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { Application, JobOffer } from '../../core/models/job-offer.model';

@Component({
  selector: 'app-my-job-offers',
  imports: [RouterLink, DashboardNav],
  templateUrl: './my-job-offers.html',
  styleUrl: './my-job-offers.scss',
})
export class MyJobOffers implements OnInit {
  offers: JobOffer[] = [];
  applications: Application[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.jobOfferService.getOffers().subscribe((res) => (this.offers = res.results));
    this.jobOfferService.getMyApplications().subscribe((res) => (this.applications = res.results));
  }

  applicationFor(offerId: number): Application | undefined {
    return this.applications.find((a) => a.offer === offerId);
  }
}
