import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CooperationComponent } from './cooperation/cooperation.component';
import { FooterComponent } from './footer/footer.component';
import { OfferComponent } from './offer/offer.component';
import { AppRoutes } from './app-routes.enum';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: AppRoutes.Main, component: MainPageComponent },
  { path: AppRoutes.PrivacyPolicy, component: PrivacyPolicyComponent },
];
