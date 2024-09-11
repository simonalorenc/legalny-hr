import { Component } from '@angular/core';
import { AppRoutes } from '../app-routes.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  mailToLink: string = 'mailto:kancelaria@legalnyhr.pl?subject=temat&body=treść';
  rootPath = AppRoutes.Footer;
  privacyPolicyPath = AppRoutes.PrivacyPolicy;
}
