import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CooperationComponent } from './cooperation/cooperation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, OfferComponent, AboutMeComponent, CooperationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'legalny-hr';
}
