import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-base-link-component',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, RouterLinkActive],
  templateUrl: './base-link-component.component.html',
  styleUrl: './base-link-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLinkComponentComponent {
  sanitizer = inject(DomSanitizer)
  router = inject(Router)
  @Input() classes!: string;
  @Input() icon!: string;
  @Input({required: true}) path: string='';
  @Input() external: boolean = false;
  @Input() activeClasses: string = '';
  @Input() download: string|null=null;
  @Input() section: string = '';

  ngOnInit() {
  }

  scrollToSection() {
    this.router.navigate([""]).then(() => {
      window.location.reload();
    });
    }
}
