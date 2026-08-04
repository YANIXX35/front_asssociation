import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { ContentService } from '../../core/services/content.service';
import { AssociationInfo, ContactInfo, Partner } from '../../core/models/content.model';

@Component({
  selector: 'app-content-manage',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './content-manage.html',
  styleUrl: './content-manage.scss',
})
export class ContentManage implements OnInit {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);

  associationId: number | null = null;
  contactId: number | null = null;
  associationMessage = '';
  contactMessage = '';
  partners: Partner[] = [];
  partnerLogoFile: File | null = null;

  associationForm = this.fb.group({
    nom_complet: ['', Validators.required],
    date_creation: [''],
    lieu_creation: [''],
    president_nom: [''],
    president_devise: [''],
    vision: [''],
    mission: [''],
    valeurs: [''],
    historique: [''],
  });

  contactForm = this.fb.group({
    adresse: [''],
    telephone: [''],
    email: [''],
    horaires: [''],
    latitude: [null as number | null],
    longitude: [null as number | null],
  });

  partnerForm = this.fb.group({
    nom: ['', Validators.required],
    type: ['entreprise', Validators.required],
    lien: [''],
  });

  ngOnInit(): void {
    this.contentService.getAssociationInfo().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      const info = list[0];
      if (info) {
        this.associationId = info.id;
        this.associationForm.patchValue(info);
      }
    });

    this.contentService.getContactInfo().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      const info = list[0];
      if (info) {
        this.contactId = info.id;
        this.contactForm.patchValue(info);
      }
    });

    this.loadPartners();
  }

  loadPartners(): void {
    this.contentService.getPartners().subscribe((res) => (this.partners = res.results));
  }

  saveAssociation(): void {
    const payload = this.associationForm.getRawValue() as Partial<AssociationInfo>;
    const request$ = this.associationId
      ? this.contentService.updateAssociationInfo(this.associationId, payload)
      : this.contentService.createAssociationInfo(payload);
    request$.subscribe((info) => {
      this.associationId = info.id;
      this.associationMessage = 'Informations enregistrées.';
    });
  }

  saveContact(): void {
    const payload = this.contactForm.getRawValue() as Partial<ContactInfo>;
    const request$ = this.contactId
      ? this.contentService.updateContactInfo(this.contactId, payload)
      : this.contentService.createContactInfo(payload);
    request$.subscribe((info) => {
      this.contactId = info.id;
      this.contactMessage = 'Coordonnées enregistrées.';
    });
  }

  onPartnerLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.partnerLogoFile = input.files?.[0] ?? null;
  }

  addPartner(): void {
    if (this.partnerForm.invalid) return;
    const raw = this.partnerForm.getRawValue();
    const formData = new FormData();
    formData.append('nom', raw.nom!);
    formData.append('type', raw.type!);
    if (raw.lien) formData.append('lien', raw.lien);
    if (this.partnerLogoFile) formData.append('logo', this.partnerLogoFile);

    this.contentService.createPartnerForm(formData).subscribe(() => {
      this.partnerForm.reset({ nom: '', type: 'entreprise', lien: '' });
      this.partnerLogoFile = null;
      this.loadPartners();
    });
  }

  removePartner(partner: Partner): void {
    if (!confirm(`Supprimer le partenaire "${partner.nom}" ?`)) return;
    this.contentService.deletePartner(partner.id).subscribe(() => this.loadPartners());
  }
}
