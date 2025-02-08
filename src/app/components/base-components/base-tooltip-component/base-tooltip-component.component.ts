import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EPopover } from '../../../core/enums/popover.enum';
import { BaseImageComponentComponent } from '../base-image-component/base-image-component.component';
import { TooltipModule } from 'primeng/tooltip';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-base-tooltip-component',
  standalone: true,
  imports: [BaseImageComponentComponent, TooltipModule, NgTemplateOutlet],
  templateUrl: './base-tooltip-component.component.html',
  styleUrl: './base-tooltip-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTooltipComponentComponent {
  @Input() classes!:string;
  @Input() popoverContent!:string;
  @Input() popoverType:EPopover = EPopover.text;
  @Input() isQuestionHead:boolean = true;
  @Input() imgWidth:number = 200;
  get EPopover(){
    return EPopover
  }
}
