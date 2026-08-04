import { Component, OnInit } from '@angular/core';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { AdminUserService } from '../../core/services/admin-user.service';
import { FormationService } from '../../core/services/formation.service';
import { EventService } from '../../core/services/event.service';
import { JobOfferService } from '../../core/services/job-offer.service';

@Component({
  selector: 'app-bureau-home',
  imports: [BureauNav],
  templateUrl: './bureau-home.html',
  styleUrl: './bureau-home.scss',
})
export class BureauHome implements OnInit {
  totalMembers = 0;
  totalFormations = 0;
  totalEvents = 0;
  pendingApplications = 0;

  constructor(
    private adminUserService: AdminUserService,
    private formationService: FormationService,
    private eventService: EventService,
    private jobOfferService: JobOfferService,
  ) {}

  ngOnInit(): void {
    this.adminUserService.list().subscribe((res) => {
      this.totalMembers = Array.isArray(res) ? res.length : res.count;
    });
    this.formationService.getFormations().subscribe((res) => (this.totalFormations = res.count));
    this.eventService.getEvents().subscribe((res) => (this.totalEvents = res.count));
    this.jobOfferService.getApplications().subscribe((res) => {
      this.pendingApplications = res.results.filter((a) => a.statut === 'en_attente').length;
    });
  }
}
