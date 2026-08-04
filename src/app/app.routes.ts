import { Routes } from '@angular/router';
import { bureauGuard, authGuard, guestGuard, mustChangePasswordGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'presentation',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'organigramme',
    loadComponent: () => import('./pages/organigramme/organigramme').then((m) => m.Organigramme),
  },
  {
    path: 'formations',
    loadComponent: () => import('./pages/formation-catalog/formation-catalog').then((m) => m.FormationCatalog),
  },
  {
    path: 'formations/:id',
    loadComponent: () => import('./pages/formation-detail/formation-detail').then((m) => m.FormationDetail),
  },
  {
    path: 'smart-gamme',
    loadComponent: () => import('./pages/smart-gamme/smart-gamme').then((m) => m.SmartGamme),
  },
  {
    path: 'smart-event',
    loadComponent: () => import('./pages/smart-event/smart-event').then((m) => m.SmartEvent),
  },
  {
    path: 'smart-event/:id',
    loadComponent: () => import('./pages/smart-event-detail/smart-event-detail').then((m) => m.SmartEventDetail),
  },
  {
    path: 'offres-professionnelles',
    loadComponent: () => import('./pages/job-offers/job-offers').then((m) => m.JobOffers),
  },
  {
    path: 'offres-professionnelles/:id',
    loadComponent: () => import('./pages/job-offer-detail/job-offer-detail').then((m) => m.JobOfferDetail),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'rejoindre',
    loadComponent: () => import('./pages/adhesion/adhesion').then((m) => m.Adhesion),
  },
  {
    path: 'connexion',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'mot-de-passe-oublie',
    loadComponent: () => import('./auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'reinitialiser-mot-de-passe',
    loadComponent: () => import('./auth/reset-password/reset-password').then((m) => m.ResetPassword),
  },
  {
    path: 'changer-mot-de-passe',
    loadComponent: () =>
      import('./auth/force-change-password/force-change-password').then((m) => m.ForceChangePassword),
    canActivate: [mustChangePasswordGuard],
  },
  {
    path: 'tableau-de-bord',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'carte-membre', pathMatch: 'full' },
      {
        path: 'carte-membre',
        loadComponent: () => import('./user-dashboard/membership-card/membership-card').then((m) => m.MembershipCard),
      },
      {
        path: 'mes-formations',
        loadComponent: () => import('./user-dashboard/mes-formations/mes-formations').then((m) => m.MesFormations),
      },
      {
        path: 'lecon/:id',
        loadComponent: () => import('./user-dashboard/lesson-player/lesson-player').then((m) => m.LessonPlayer),
      },
      {
        path: 'offres-pro',
        loadComponent: () => import('./user-dashboard/my-job-offers/my-job-offers').then((m) => m.MyJobOffers),
      },
      {
        path: 'smart-event',
        loadComponent: () => import('./user-dashboard/my-events/my-events').then((m) => m.MyEvents),
      },
      {
        path: 'smart-gamme',
        loadComponent: () => import('./user-dashboard/my-smart-gamme/my-smart-gamme').then((m) => m.MySmartGamme),
      },
      {
        path: 'mentorat',
        loadComponent: () => import('./user-dashboard/my-mentorat/my-mentorat').then((m) => m.MyMentorat),
      },
      {
        path: 'profil',
        loadComponent: () => import('./user-dashboard/profile/profile').then((m) => m.Profile),
      },
    ],
  },
  {
    path: 'bureau',
    canActivate: [bureauGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./bureau-dashboard/bureau-home/bureau-home').then((m) => m.BureauHome),
      },
      {
        path: 'organigramme',
        loadComponent: () =>
          import('./bureau-dashboard/organigramme-manage/organigramme-manage').then((m) => m.OrganigrammeManage),
      },
      {
        path: 'membres',
        loadComponent: () =>
          import('./bureau-dashboard/members-directory/members-directory').then((m) => m.MembersDirectory),
      },
      {
        path: 'creer-membre',
        loadComponent: () => import('./bureau-dashboard/create-member/create-member').then((m) => m.CreateMember),
      },
      {
        path: 'adhesions',
        loadComponent: () =>
          import('./bureau-dashboard/adhesions-manage/adhesions-manage').then((m) => m.AdhesionsManage),
      },
      {
        path: 'formations',
        loadComponent: () =>
          import('./bureau-dashboard/formations-manage/formations-manage').then((m) => m.FormationsManage),
      },
      {
        path: 'formations/nouvelle',
        loadComponent: () => import('./bureau-dashboard/formation-form/formation-form').then((m) => m.FormationForm),
      },
      {
        path: 'formations/:id/modifier',
        loadComponent: () => import('./bureau-dashboard/formation-form/formation-form').then((m) => m.FormationForm),
      },
      {
        path: 'smart-event',
        loadComponent: () => import('./bureau-dashboard/events-manage/events-manage').then((m) => m.EventsManage),
      },
      {
        path: 'offres-professionnelles',
        loadComponent: () =>
          import('./bureau-dashboard/job-offers-manage/job-offers-manage').then((m) => m.JobOffersManage),
      },
      {
        path: 'smart-gamme',
        loadComponent: () =>
          import('./bureau-dashboard/smart-gamme-manage/smart-gamme-manage').then((m) => m.SmartGammeManage),
      },
      {
        path: 'mentorat',
        loadComponent: () =>
          import('./bureau-dashboard/mentorat-manage/mentorat-manage').then((m) => m.MentoratManage),
      },
      {
        path: 'communication',
        loadComponent: () => import('./bureau-dashboard/communication/communication').then((m) => m.Communication),
      },
      {
        path: 'finances',
        loadComponent: () => import('./bureau-dashboard/finances/finances').then((m) => m.Finances),
      },
      {
        path: 'contenu',
        loadComponent: () => import('./bureau-dashboard/content-manage/content-manage').then((m) => m.ContentManage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
