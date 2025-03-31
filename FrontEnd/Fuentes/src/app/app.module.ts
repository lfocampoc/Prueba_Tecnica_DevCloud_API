import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { ThemeService } from './services/theme-service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { CustomIconService } from './common/custom-icons/custom-icon.service';
import { MainHttpInterceptor } from '@interceptors/main-http-interceptor';
import { SessionService } from '@utils/session-util';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      AppRoutes,
      {
        enableTracing: false,
        scrollPositionRestoration: 'enabled',
        useHash: true
      }
    ),  
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MainHttpInterceptor
    },
    CustomIconService,
    provideHttpClient(),
    ThemeService,
    provideAnimationsAsync(),
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
