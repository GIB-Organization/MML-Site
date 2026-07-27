import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-image-component',
  standalone: true,
  imports: [NgStyle],
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
 @Input() width: string = '';

 imageClicked(){
  this.clicked.emit();
 }

  resolvedWidthStyle(): Record<string, string> {
    const w = this.width?.trim();
    if (!w) {
      return {};
    }
    if (w.endsWith('%')) {
      return { width: w, maxWidth: '100%' };
    }
    const px = Number.parseInt(w, 10);
    if (!Number.isNaN(px)) {
      return { width: `${px}px`, maxWidth: '100%', height: 'auto' };
    }
    return { width: w, maxWidth: '100%' };
  }
}