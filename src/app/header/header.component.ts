import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideToggle', [
      state('void', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', [animate('300ms ease-in-out')]),
    ]),
    trigger('transparentBackground', [
      state('true', style({ backgroundColor: 'transparent' })),
      state('false', style({ backgroundColor: '#000000' })),
      transition('* <=> *', animate(350)),
    ]),
  ],
})
export class HeaderComponent {
  private TRANSPARENT_SCROLL_OFFSET: number = 40;
  isCollapsed: boolean = true;
  isTransparent: boolean = true;
  toggleIcon: string = "header/menu.svg";

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if (!this.isCollapsed) return;
    this.isTransparent = this.isTransparentScrollOffset();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleIcon = this.isCollapsed ? "header/menu.svg" : "header/close.svg";
    this.isTransparent = this.isCollapsed && this.isTransparentScrollOffset();
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET;
  }
}
