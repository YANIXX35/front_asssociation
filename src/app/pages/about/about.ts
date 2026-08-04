import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { AssociationInfo, Partner } from '../../core/models/content.model';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  info: AssociationInfo | null = null;
  entreprises: Partner[] = [];
  universites: Partner[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getAssociationInfo().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      this.info = list[0] ?? null;
    });
    this.contentService.getPartners('entreprise').subscribe((res) => (this.entreprises = res.results));
    this.contentService.getPartners('universite').subscribe((res) => (this.universites = res.results));
  }
}
