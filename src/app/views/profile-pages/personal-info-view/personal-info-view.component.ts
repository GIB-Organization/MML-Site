import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChangeMainDataComponentComponent } from '../../../components/views-components/profile/change-main-data-component/change-main-data-component.component';
import { ChangePasswordComponentComponent } from '../../../components/views-components/profile/change-password-component/change-password-component.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info-view',
  standalone: true,
  imports: [ChangeMainDataComponentComponent, ChangePasswordComponentComponent],
  templateUrl: './personal-info-view.component.html',
  styleUrl: './personal-info-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoViewComponent implements OnInit {
  title = inject(Title);
  translate = inject(TranslateService);
  ngOnInit(): void {
    this.title.setTitle(this.translate.instant('views.profile.personalInfo.title'))
  }
}
 