import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isCollapsed: boolean = true;
  toggleIcon: string = "header/menu.svg";

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.toggleIcon = "header/menu.svg";
    } else if (!this.isCollapsed) {
      this.toggleIcon = "header/close.svg";
    }
  }
}
