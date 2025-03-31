import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@common/modal/modal.service';
import { ThemeService } from '@services/theme-service';
import { SessionService } from '@utils/session-util';
import { sessionPersistence } from '@utils/storage-util';

@Component({
  selector: 'screen-header',
  template: `<div class="mat-typography">
        <section class="navigator-header">
          <mat-toolbar color="primary">
            <button mat-icon-button class="btn-menu" aria-label="Example icon-button with menu icon">
              <mat-icon svgIcon="menu"></mat-icon>
            </button>
            <span>Bienvenida: {{ userLogin.Name }} {{ userLogin.LastName }} - {{ userLogin.TypeUser === 1 ? 'Administrador' : 'Gestor' }} </span>
            <span class="order-items"></span>

            <a (click)="toggleTheme()">
              <mat-icon *ngIf="themeService.themeSignal() === 'dark'" svgIcon="sun"></mat-icon>
              <mat-icon *ngIf="themeService.themeSignal() !== 'dark'" svgIcon="moon"></mat-icon>
            </a>
            <a (click)="logout()">
              <mat-icon svgIcon="logout"></mat-icon>
            </a>
          </mat-toolbar>
        </section>
    </div>`,
})
export class HeaderComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);

  public userLogin: any
  public language: string;

  constructor(
    private modalService: ModalService,
    public sessionService: SessionService,
    private router: Router,
  ) {
    this.userLogin = this.sessionService.getSessionData();
  }

  ngOnInit(): void {
    console.log()
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  logout() {
    this.closeAllModals();
    this.sessionService.removeSessionData();
    this.sessionService.removeToken();
    this.router.navigateByUrl('/');

    this.sessionService.removeAllLocalStorage();
    this.sessionService.removeAllSesionStorage();
  }

  private closeAllModals() {
    const modalOpen = sessionPersistence.get('idModal');
 
    if (modalOpen) {
      this.modalService.close(modalOpen);
    }
  }
}