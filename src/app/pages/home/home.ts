import { DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { FormationService } from '../../core/services/formation.service';
import { EventService } from '../../core/services/event.service';
import { AssociationInfo } from '../../core/models/content.model';
import { Formation } from '../../core/models/formation.model';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  info: AssociationInfo | null = null;
  featuredFormations: Formation[] = [];
  upcomingEvents: Event[] = [];

  constructor(
    private contentService: ContentService,
    private formationService: FormationService,
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.contentService.getAssociationInfo().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      this.info = list[0] ?? null;
    });
    this.formationService.getFormations().subscribe((res) => (this.featuredFormations = res.results.slice(0, 3)));
    this.eventService.getEvents().subscribe((res) => (this.upcomingEvents = res.results.slice(0, 3)));
  }
}
