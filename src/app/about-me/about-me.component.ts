import { Component } from '@angular/core';
import { AppRoutes } from '../app-routes.enum';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  public rootPath = AppRoutes.AboutMe;
}
