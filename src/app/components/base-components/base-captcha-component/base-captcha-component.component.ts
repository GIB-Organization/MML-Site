import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild, model } from '@angular/core';
import { BaseImageComponentComponent } from '../base-image-component/base-image-component.component';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-captcha-component',
  standalone: true,
  imports: [BaseImageComponentComponent, TranslateModule, FormsModule],
  templateUrl: './base-captcha-component.component.html',
  styleUrl: './base-captcha-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCaptchaComponentComponent {
  @Input({ required: true }) id: string = '';
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  codeIsCorrect = model<boolean>(false)
  captchaCode = ''
  randomCode = ''
  captchaTimeout: any = null;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) public platform_id: Object) {
    this.isBrowser = isPlatformBrowser(platform_id);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.setCaptchaTimeout();
      this.refreshCaptcha();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.captchaTimeout);
  }

  setCaptchaTimeout() {
    this.captchaTimeout = setInterval(() => {
      this.refreshCaptcha();
    }, 1 * 60000);
  }

  generateRandomNumber() {

    const chars = "0123456789";

    const stringLength = 4;
    let ChangeCaptcha = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      ChangeCaptcha += chars.substring(rnum, rnum + 1);
    }

    return ChangeCaptcha;
  }

  generateCaptcha(code: string) {
    const colors = ['#FFB349', '#121518', '#e83a3a', '#383e43']
    const c = this.canvasElement.nativeElement;
    const canvas: any = c.getContext("2d");
    canvas.clearRect(0, 0, 140, 40);
    const gradient = canvas.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop(0, "#f1f1f1");
    gradient.addColorStop(1, "#f1f1f1");
    canvas.fillStyle = gradient;
    canvas.beginPath();
    canvas.rect(0, 0, 140, 40);
    canvas.fill();

    const ctx0: any = c.getContext("2d");
    ctx0.font = this.getRandomNumber(16, 24) + 'px serif';
    ctx0.strokeStyle = colors[this.getRandomNumber(0, 3)];
    ctx0.strokeText(code[0], 25, 27);

    const ctx1: any = c.getContext("2d");
    ctx1.font = this.getRandomNumber(16, 24) + 'px serif';
    ctx1.strokeStyle = colors[this.getRandomNumber(0, 3)];

    ctx1.strokeText(code[1], 40, 27);

    const ctx2: any = c.getContext("2d");
    ctx2.font = this.getRandomNumber(16, 24) + 'px serif';
    ctx2.strokeStyle = colors[this.getRandomNumber(0, 3)];
    ctx2.strokeText(code[2], 55, 27);

    const ctx3: any = c.getContext("2d");
    ctx3.font = this.getRandomNumber(16, 24) + 'px serif';
    ctx3.strokeStyle = colors[this.getRandomNumber(0, 3)];
    ctx3.strokeText(code[3], 70, 27);


    const ctxLine: any = c.getContext("2d");
    ctxLine.beginPath();
    ctxLine.moveTo(25, 20);
    ctxLine.lineTo(80, 20);
    ctxLine.strokeStyle = "#999999";
    ctxLine.lineWidth = 1;
    ctxLine.stroke()
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  refreshCaptcha() {
    const code = this.generateRandomNumber()
    this.randomCode = code
    this.captchaCode = '';
    this.captchaCodeChanged()
    this.generateCaptcha(code)
  }

  captchaCodeChanged(){
    this.codeIsCorrect.set(this.captchaCode === this.randomCode ? true:false)
  }
}
