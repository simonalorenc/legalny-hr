import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

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
  private TRANSPARENT_SCROLL_OFFSET: number = 40;
  isCollapsed: boolean = true;
  isTransparent: boolean = true;
  isScreenLarge: boolean = false;
  toggleIcon: string = 'header/menu.svg';

  constructor(private viewportScroller: ViewportScroller,private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenWidth();
    }
  }

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if (!this.isCollapsed) return;
    this.isTransparent = this.isTransparentScrollOffset();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    this.checkScreenWidth();
    if (window.innerWidth > 992 && !this.isCollapsed) {
      this.toggleCollapse();
    }
  }

  private checkScreenWidth(): void {
    this.isScreenLarge = window.innerWidth > 992; 
    console.log(this.isScreenLarge)
  }

  toggleCollapse() {
    console.log(this.isCollapsed)
    this.isCollapsed = !this.isCollapsed;
    this.toggleIcon = this.isCollapsed ? 'header/menu.svg' : 'header/close.svg';
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET;
  }

  scrollTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
    if (!this.isCollapsed) {
      this.toggleCollapse();
    }
  }

  onClickHome() {
    this.router.navigate([''])
  }

  onClickHomeAndScrollTo(anchor: string) {
    this.router.navigate(['']);
    this.scrollTo(anchor)
  }
}
