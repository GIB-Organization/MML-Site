import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { toSafeExternalUrl } from '../../../core/utils/safeUrl';
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
  router = inject(Router)
  @Input() classes!: string;
  @Input() icon!: string;
  @Input({required: true}) path: string='';
  @Input() external: boolean = false;
  @Input() activeClasses: string = '';
  @Input() download: string|null=null;

  /** VULN-065: null when the address is not http(s), mailto or tel; the link is then not rendered at all */
  get safePath(): string | null { return toSafeExternalUrl(this.path); }
  @Input() section: string = '';

  ngOnInit() {
  }

  scrollToSection() {
    this.router.navigate([""]).then(() => {
      window.location.reload();
    });
    }
  
}
