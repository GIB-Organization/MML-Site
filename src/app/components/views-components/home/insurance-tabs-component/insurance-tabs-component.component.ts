import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  generalSettings?:IGeneralSettings;

  tabs:{lang: string, active?:boolean, show: boolean, url?: string}[]=[
    {
      lang:'carInsurance',
      show: this.generalSettings?.showCarInsurance??false,
      url: this.generalSettings?.carInsuranceUrl,
      active: true,
    },
    {
      lang:'medicalInsurance',
      show: this.generalSettings?.showMedicalInsurance??false,
      url: this.generalSettings?.medicalInsuranceUrl,
    },
    {
      lang:'medicalFaultsInsurance',
      show: this.generalSettings?.showMedicalFaults??false,
      url: this.generalSettings?.medicalFaultsUrl,
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
        url: this.generalSettings?.carInsuranceUrl,
        active: true,
      },
      {
        lang:'medicalInsurance',
        show: this.generalSettings?.showMedicalInsurance??false,
        url: this.generalSettings?.medicalInsuranceUrl,
      },
      {
        lang:'medicalFaultsInsurance',
        show: this.generalSettings?.showMedicalFaults??false,
        url: this.generalSettings?.medicalFaultsUrl,
      },
    ]
    }

  openTab(tab: {url?: string}): void {
    if (tab.url) {
      window.location.href = tab.url;
    }
  }

  getGeneralSettings(){
    this.settingsApiService.getGeneralSettings().subscribe(res => {
      this.generalSettings = res.result;
      this.updateTabs();
      this.cdr.markForCheck();
    })
  }

  get visibleTabsCount(): number {
    return this.tabs.filter(tab => tab.show).length;
  }
  
}
