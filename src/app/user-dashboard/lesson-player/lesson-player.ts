import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormationService } from '../../core/services/formation.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { Lesson } from '../../core/models/formation.model';

@Component({
  selector: 'app-lesson-player',
  imports: [DashboardNav, RouterLink],
  templateUrl: './lesson-player.html',
  styleUrl: './lesson-player.scss',
})
export class LessonPlayer implements OnInit {
  lesson: Lesson | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  safeFileUrl: SafeResourceUrl | null = null;
  loading = true;
  errorMessage = '';
  completed = false;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getLesson(id).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        if (lesson.video_url) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.video_url);
        }
        if (lesson.fichier) {
          this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.fichier);
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de charger cette leçon (êtes-vous inscrit à la formation ?).";
        this.loading = false;
      },
    });
  }

  markComplete(): void {
    if (!this.lesson) return;
    this.formationService.completeLesson(this.lesson.id, true).subscribe({
      next: () => (this.completed = true),
      error: () => (this.errorMessage = "Impossible de marquer cette leçon comme terminée."),
    });
  }
}
