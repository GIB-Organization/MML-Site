import { InputNumberModule } from 'primeng/inputnumber';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { ShadowBoxComponentComponent } from '../../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { DeferBlockComponentComponent } from './../../../components/shared-components/defer-block-component/defer-block-component.component';
import { EmptyDataComponentComponent } from './../../../components/shared-components/empty-data-component/empty-data-component.component';
import { ChangeDetectionStrategy, Component, inject, OnInit, DestroyRef, Signal, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PolicyBoxComponent } from '../../../components/views-components/profile/policy-box/policy-box.component';
import { DividerModule } from 'primeng/divider';
import { PoliciesStoreQuery } from '../../../store/policiesStore/policies-store.query';
import { PoliciesStoreService } from '../../../store/policiesStore/policies-store.service';
import { LoadingContentComponentComponent } from '../../../components/shared-components/loading-content-component/loading-content-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PoliciesFilterPipe } from '../../../core/pipes/policiesFilter/policies-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { IPolicy } from '../../../models/policy.interface';
import { EPolicyNajmStatus, EPolicyStatus, EPolicyTabs } from '../../../core/enums';
import { numericEnumKeysArray } from '../../../core/utils/numericEnumToArray';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quotations-view',
  standalone: true,
  imports: [EmptyDataComponentComponent, DeferBlockComponentComponent, ShadowBoxComponentComponent, InputNumberModule, TranslateModule, PolicyBoxComponent, DividerModule, LoadingContentComponentComponent, ReactiveFormsModule, TabViewModule ],
  templateUrl: './quotations-view.component.html',
  styleUrl: './quotations-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationsViewComponent implements OnInit {
  ref = inject(DestroyRef);
  title = inject(Title);
  translate = inject(TranslateService);
  policyStatusEnumKeys:any = numericEnumKeysArray(this.EPolicyTabs);
  policiesStoreQuery = inject(PoliciesStoreQuery)
  policiesStoreService = inject(PoliciesStoreService)
  isLoading= toSignal<boolean>(this.policiesStoreQuery.selectLoading())
  policies = toSignal<IPolicy[]>(this.policiesStoreQuery.policies$);
  policiesTabs : Signal<{[key:string]: IPolicy[]}> = computed(() => {
    let tabs:{[key:string]: IPolicy[]}={};
    this.policies()?.map(item=> {
      if((item.policyStatus === EPolicyStatus.active)){
        tabs[this.EPolicyTabs.active] = [...tabs?.[this.EPolicyTabs.active]??[], item]
      }
      if((Number(item.policyLeftDays) <= 40) && (item.policyStatus === EPolicyStatus.active)){
        tabs[this.EPolicyTabs.toRenew] = [...tabs?.[this.EPolicyTabs.toRenew]??[], item]
      }
      if((item.policyStatus === EPolicyStatus.expired)){
        tabs[this.EPolicyTabs.expired] = [...tabs?.[this.EPolicyTabs.expired]??[], item]
      }
      if((item.policyStatus === EPolicyStatus.active) && item.najmStatus === EPolicyNajmStatus.pending){
        tabs[this.EPolicyTabs.underPublish] = [...tabs?.[this.EPolicyTabs.underPublish]??[], item]
      }
    })
    return tabs
  });

  get EPolicyTabs(){
    return EPolicyTabs
  }
  
  ngOnInit(): void {
    this.title.setTitle(this.translate.instant('views.profile.quotations.title'))
    this.policiesStoreService.getAllPolicies(this.ref);
  }
}
