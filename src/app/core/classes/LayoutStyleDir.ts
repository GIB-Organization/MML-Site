import { DOCUMENT } from "@angular/common";
import { inject } from "@angular/core";
import { dirType, langType } from "../enums/language.enum";
import { LanguageService } from "../../services/language/language.service";
import { PlatformService } from "../../services/platform/platform.service";



export interface ILayoutStrategy {
    direction: dirType;
    lang: langType;
    switchDirection(): void;
}
export class LtrDirection implements ILayoutStrategy {
    lang: langType = 'en';
    direction: dirType = "ltr";
    doc = inject(DOCUMENT);
    platform = inject(PlatformService);
    language = inject(LanguageService);
    switchDirection(): void {
        if (this.platform.isPlatformBrowser()) {
            this.language.switchLang(this.lang);
            let htmlEl = this.doc.getElementsByTagName('html')[0];
            htmlEl?.setAttribute('dir', this.direction);
            htmlEl?.setAttribute('lang', this.lang);
            let rtlStyleBootstrap = this.doc.getElementById('rtl-bootstrap-id');
            rtlStyleBootstrap?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        }
    }
}
export class RtlDirection implements ILayoutStrategy {
    lang: langType = 'ar';
    direction: dirType = "rtl";
    doc = inject(DOCUMENT);
    platform = inject(PlatformService);
    language = inject(LanguageService);
    switchDirection(): void {
        if (this.platform.isPlatformBrowser()) {
            this.language.switchLang(this.lang);
            let htmlEl = this.doc.getElementsByTagName('html')[0];
            htmlEl?.setAttribute('dir', this.direction);
            htmlEl?.setAttribute('lang', this.lang);
            let rtlStyleBootstrap = this.doc.getElementById('rtl-bootstrap-id');
            rtlStyleBootstrap?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css');
        }
    }
}