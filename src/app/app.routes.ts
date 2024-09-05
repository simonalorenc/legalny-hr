import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CooperationComponent } from './cooperation/cooperation.component';
import { FooterComponent } from './footer/footer.component';
import { OfferComponent } from './offer/offer.component';

export const routes: Routes = [
    { path: '', redirectTo: '/legalnyhr', pathMatch: 'full' },
    { path: 'legalnyhr', component: HomeComponent },
    { path: 'uslugi', component: OfferComponent },
    { path: 'o-mnie', component: AboutMeComponent },
    { path: 'wspolpraca', component: CooperationComponent },
    { path: 'kontakt', component: FooterComponent }
];
