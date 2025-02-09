import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { SettingsApiService } from '../../../../services/api/settingsApi/settings-api.service';
import { IGeneralSettings } from '../../../../models/settings.interface';

@Component({
  selector: 'app-insurance-tabs-component',
  standalone: true,
  imports: [TranslateModule, NgClass],
  templateUrl: './insurance-tabs-component.component.html',
  styleUrl: './insurance-tabs-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceTabsComponentComponent implements OnInit  {
  settingsQuery = inject(SettingsQuery);
  settingsApiService = inject(SettingsApiService);
  generalSettings?:IGeneralSettings;

  tabs:{lang: string, active?:boolean, show: boolean}[]=[
    {
      lang:'carInsurance',
      show: this.generalSettings?.showCarInsurance??false,
    },
    {
      lang:'medicalInsurance',
      show: this.generalSettings?.showMedicalInsurance??false,
    },
    {
      lang:'medicalFaultsInsurance',
      show: this.generalSettings?.showMedicalFaults??false,
      active: true,
    },
  ]

  ngOnInit(): void {
      this.getGeneralSettings(); 
  }

  private updateTabs(): void {
    this.tabs=[
      {
        lang:'carInsurance',
        show: this.generalSettings?.showCarInsurance??false,
      },
      {
        lang:'medicalInsurance',
        show: this.generalSettings?.showMedicalInsurance??false,
      },
      {
        lang:'medicalFaultsInsurance',
        show: this.generalSettings?.showMedicalFaults??false,
        active: true,
      },
    ]
    }

  getGeneralSettings(){
    this.settingsApiService.getGeneralSettings().subscribe(res => {
      this.generalSettings = res.result;
      this.updateTabs(); 

    })
  }
}
