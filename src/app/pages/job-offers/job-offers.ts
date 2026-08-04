import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOfferService } from '../../core/services/job-offer.service';
import { JobOffer } from '../../core/models/job-offer.model';

@Component({
  selector: 'app-job-offers',
  imports: [RouterLink, DatePipe],
  templateUrl: './job-offers.html',
  styleUrl: './job-offers.scss',
})
export class JobOffers implements OnInit {
  offers: JobOffer[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.jobOfferService.getOffers().subscribe((res) => (this.offers = res.results));
  }
}
