import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../../core/services/content.service';
import { ContactInfo } from '../../core/models/content.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private contentService = inject(ContentService);
  private sanitizer = inject(DomSanitizer);

  contactInfo: ContactInfo | null = null;
  mapUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    this.contentService.getContactInfo().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      this.contactInfo = list[0] ?? null;
      if (this.contactInfo?.latitude && this.contactInfo?.longitude) {
        const { latitude, longitude } = this.contactInfo;
        const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    });
  }
}
