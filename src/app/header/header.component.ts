import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavigationEnd, RouterModule, Scroll } from '@angular/router';
import { Router } from '@angular/router';
import { AppRoutes, AppSections } from '../app-routes.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideToggle', [
      state('void', style({ height: '0', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', [animate('300ms ease-in-out')]),
    ]),
    trigger('transparentBackground', [
      state('true', style({ backgroundColor: 'transparent' })),
      state('false', style({ backgroundColor: '#000000' })),
      transition('* <=> *', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent {
  private TRANSPARENT_SCROLL_OFFSET: number = 50;
  private HEADER_OFFSET: number = 50;
  isCollapsed: boolean = true;
  isTransparent: boolean = true;
  isScrollAnimation: boolean = true;
  isScreenLarge: boolean = false;
  toggleIcon: string = 'header/menu.svg';
  routes = AppRoutes;

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    viewportScroller.setOffset([0, this.HEADER_OFFSET]);
    router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        this.handleScrollEvent(event);
      } else if (event instanceof NavigationEnd) {
        this.handleNavigationEndEvent(event);
      }
    });
  }

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if (!this.isCollapsed) return;
    if (!this.isScrollAnimation) return;
    this.isTransparent = this.isTransparentScrollOffset();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    this.checkScreenWidth();
    if (window.innerWidth > 992 && !this.isCollapsed) {
      this.toggleCollapse();
    }
  }

  private handleScrollEvent(event: Scroll) {
    if (event.anchor) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(event.anchor!);
      });
    } else if (event.position) {
      this.viewportScroller.scrollToPosition(event.position);
    } else {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  private handleNavigationEndEvent(event: NavigationEnd) {
    const currentUrl = this.router.routerState.snapshot.url;
    const isPrivacyPolicyComponent = currentUrl.includes(
      AppRoutes.PrivacyPolicy 
    );
    this.isScrollAnimation = !isPrivacyPolicyComponent;
    this.isTransparent = !isPrivacyPolicyComponent;
  }

  private checkScreenWidth(): void {
    this.isScreenLarge = window.innerWidth > 992;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleIcon = this.isCollapsed ? 'header/menu.svg' : 'header/close.svg';
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET;
  }

  onClickOffer() {
    this.navigateToMain(AppSections.Offer);
  }

  onClickAboutMe() {
    this.navigateToMain(AppSections.AboutMe);
  }

  onClickCooperation() {
    this.navigateToMain(AppSections.Cooperation);
  }

  onClickFooter() {
    this.navigateToMain(AppSections.Footer);
  }

  private navigateToMain(fragment: string) {
    this.router.navigate([AppRoutes.Main], { fragment: fragment });
    if (!this.isCollapsed) {
      this.toggleCollapse();
    }
  }
}
