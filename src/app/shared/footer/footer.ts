import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ContactInfo } from '../../core/models/content.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  contactInfo: ContactInfo | null = null;
  year = new Date().getFullYear();

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContactInfo().subscribe({
      next: (res) => {
        const list = Array.isArray(res) ? res : res.results;
        this.contactInfo = list[0] ?? null;
      },
      error: () => (this.contactInfo = null),
    });
  }
}
