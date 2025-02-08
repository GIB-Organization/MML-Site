import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-image-component',
  standalone: true,
  imports: [],
  templateUrl: './base-image-component.component.html',
  styleUrl: './base-image-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseImageComponentComponent {
 @Input({required: true}) path!: string;
 @Input() classes: string = '';
 @Input() isAssets: boolean = true;
 @Input({required: true}) alt!: string;
 @Output() clicked = new EventEmitter();

 imageClicked(){
  this.clicked.emit();
 }
}