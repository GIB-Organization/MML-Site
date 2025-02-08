import { ProfileSidebarComponentComponent } from './../../components/views-components/profile/profile-sidebar-component/profile-sidebar-component.component';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShadowBoxComponentComponent } from '../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { AnimationsContext } from '../../core/animations/animations.class';
import { routeAnimations } from '../../core/animations/animations.animation';
import { Observable, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [TranslateModule, ProfileSidebarComponentComponent, RouterOutlet],
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileLayoutComponent extends AnimationsContext {

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private _title!: string;
  private routeEvent$: Observable<Event> = this.router.events;

  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.children[0].data['title'];
    this.routeEvent$.pipe(takeUntilDestroyed(this.destroyRef), filter(event => event instanceof NavigationEnd))
      .subscribe((res) => {
        this.title = this.activatedRoute.snapshot.children[0].data['title'];
      });
  }
  
}
