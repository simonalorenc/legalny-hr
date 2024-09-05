import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { HeaderRoutingService } from '../header-routing.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideToggle', [
      state('void', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('* <=> *', [animate('300ms ease-in-out')]),
    ]),
    trigger('transparentBackground', [
      state('true', style({ backgroundColor: 'transparent' })),
      state('false', style({ backgroundColor: '#000000' })),
      transition('* <=> *', animate(350)),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private TRANSPARENT_SCROLL_OFFSET: number = 40;
  isCollapsed: boolean = true;
  isTransparent: boolean = true;
  toggleIcon: string = "header/menu.svg";

  constructor(private viewportScroller: ViewportScroller, private headerRoutingService: HeaderRoutingService) {}

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if (!this.isCollapsed) return;
    this.isTransparent = this.isTransparentScrollOffset();
  }

  ngOnInit(): void {
    
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleIcon = this.isCollapsed ? "header/menu.svg" : "header/close.svg";
    this.isTransparent = this.isCollapsed && this.isTransparentScrollOffset();
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET;
  }

  onClickOffer() {
    this.headerRoutingService.onClickOffer();
    this.viewportScroller.scrollToAnchor('');
  }
}
