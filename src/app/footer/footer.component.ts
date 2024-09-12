import { Component } from '@angular/core';
import { AppRoutes, AppSections } from '../app-routes.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  mailToLink: string = 'mailto:kancelaria@legalnyhr.pl';
  sectionName = AppSections.Footer;
  privacyPolicyPath = AppRoutes.PrivacyPolicy;
}
