import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BaseImageComponentComponent } from '../base-image-component/base-image-component.component';
import { EPopover } from '../../../core/enums/popover.enum';
import { BaseTooltipComponentComponent } from '../base-tooltip-component/base-tooltip-component.component';

@Component({
  selector: 'app-base-label-component',
  standalone: true,
  imports: [BaseImageComponentComponent, BaseTooltipComponentComponent],
  templateUrl: './base-label-component.component.html',
  styleUrl: './base-label-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLabelComponentComponent{
  @ViewChild('tooltipContent') ref!:TemplateRef<any>;
  @Input() classes!:string;
  @Input() for!:string;
  @Input() required:boolean = false;
  @Input() isPopover:boolean = false;
  @Input() popoverContent!:string;
  @Input() popoverType:EPopover = EPopover.text;

  get EPopover(){
    return EPopover
  }
}
