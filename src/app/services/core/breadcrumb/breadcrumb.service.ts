import { DestroyRef, Injectable, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { BreadcrumbItem } from '../../../models/layout-models/breadcrumb.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private _breadcrumbs : WritableSignal<BreadcrumbItem[]> = signal([]);
  get breadcrumbs():BreadcrumbItem[]{
    return this._breadcrumbs()
  }
  set breadcrumbs(items:BreadcrumbItem[]){
    this._breadcrumbs.set(items)
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  add(item: BreadcrumbItem) {
    this.breadcrumbs = [...this.breadcrumbs, item];
  }

  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['title'];
      if (label) {
        breadcrumbs.push({ label, path: url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs
  }

  startBuildingBreadcrumbs(untilDestroyed: DestroyRef) {
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(), // Avoid duplicate emissions for same route
        takeUntilDestroyed(untilDestroyed)
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute);
      });
  }
}
