import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable()
export class CustomIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {}

  init() {
    this.matIconRegistry.addSvgIcon(
      'moon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/moon.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'sun',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sun.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/resume.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'ram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ram.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'cpu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/cpu.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'disk',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hard-disk.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'windows',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/windows.svg'),
    );
  }
}
