import { Component } from '@angular/core';
import { AppSections } from '../app-routes.enum';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  sectionName = AppSections.AboutMe;
}
