import { Component } from '@angular/core';
import { OfferItem } from './data/offer-item';
import offersJson from '../offer/data/offers.json';
import { AppRoutes } from '../app-routes.enum';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
})
export class OfferComponent {
  employerOffers: OfferItem[] = offersJson.employer;
  employeeOffers: OfferItem[] = offersJson.employee;
  routePath = AppRoutes.Offer;
}
