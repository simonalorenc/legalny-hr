import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderRoutingService {

  constructor(private router: Router) { }

  onClickOffer() {
    this.router.navigate(['/uslugi']);
  }
}
