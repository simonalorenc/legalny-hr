import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { OfferComponent } from '../offer/offer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { CooperationComponent } from '../cooperation/cooperation.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HomeComponent, OfferComponent, AboutMeComponent, CooperationComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
