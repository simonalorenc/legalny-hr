import { Component } from '@angular/core';
import cooperationJson from '../cooperation/data/cooperation.json';
import { CooperationItem } from './data/cooperation-item';
import { AppSections } from '../app-routes.enum';

@Component({
  selector: 'app-cooperation',
  standalone: true,
  imports: [],
  templateUrl: './cooperation.component.html',
  styleUrl: './cooperation.component.scss'
})
export class CooperationComponent {
  cooperationItems: CooperationItem[] = cooperationJson.cooperation;
  sectionName = AppSections.Cooperation;
}
