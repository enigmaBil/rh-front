import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, distinctUntilChanged, map } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    ).subscribe(breadcrumbs => this.breadcrumbsSubject.next(breadcrumbs));
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.routeConfig && route.routeConfig.data) {
      const routeUrl = route.routeConfig.data['url'] ? `${url}/${route.routeConfig.data['url']}` : url;
      const breadcrumbLabel = route.routeConfig.data['breadcrumb'];

      if (breadcrumbLabel) {
        breadcrumbs.push({ label: breadcrumbLabel, url: routeUrl });
      }
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
