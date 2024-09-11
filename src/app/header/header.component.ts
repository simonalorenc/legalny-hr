import { CommonModule, ViewportScroller } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavigationEnd, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoutes } from '../app-routes.enum';
import { filter } from 'rxjs';

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
  private HEADER_OFFSET: number = 40;
  isCollapsed: boolean = true;
  isTransparent: boolean = true;
  isScrollAnimation: boolean = true;
  isScreenLarge: boolean = false;
  logoSrc: string = 'header/logo.svg';
  toggleIcon: string = 'header/menu.svg';
  public routes = AppRoutes;

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenWidth();
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.routerState.snapshot.url;
        console.log(currentUrl)
        if (currentUrl.includes('polityka-prywatnosci')) {
          this.isScrollAnimation = false;
          this.isTransparent = false;
        } else {
          this.isScrollAnimation = true;
          this.isTransparent = true;
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

  scrollTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
    if (!this.isCollapsed) {
      this.toggleCollapse();
    }
  }

  onClickHome() {
    this.router.navigate(['legalnyhr']);
  }

  onClickHomeAndScrollTo(anchor: string) {
    this.router.navigate(['/legalnyhr', anchor]).then(() => {
      setTimeout(() => {
        const element = document.querySelector(`#${anchor}`);
        if (element) {
          this.checkScreenWidth();
          if (!this.isScreenLarge) {
            this.toggleCollapse();
          }
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - this.HEADER_OFFSET;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    });
  }
}
