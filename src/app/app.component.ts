import { afterRender, AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { AuthStoreService } from './store/authStore/auth-store.service';
import { LoadingSpinnerComponent } from './components/layout-components/loading-spinner/loading-spinner.component';
import { routeFadeAnimation } from './core/animations/animations.animation';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule,ToastModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[routeFadeAnimation]
})
export class AppComponent implements OnInit{
  authStoreService = inject(AuthStoreService);
  contentLoading = signal(true);
  ngOnInit(): void {
      this.authStoreService.getUserFromLocal();
  }
  constructor(){
    afterRender(()=>{
      this.contentLoading.set(false)  
    })
  }
} 
