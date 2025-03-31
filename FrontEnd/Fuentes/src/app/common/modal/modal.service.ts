import { Injectable } from '@angular/core';
import { sessionPersistence } from '@utils/storage-util';

@Injectable()
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  close(id: string) {
    const modal: any = this.modals.filter((x) => x.id === id)[0];

    sessionPersistence.delete('idModal');
    modal.close();
  }

  open(id: string) {
    const modal: any = this.modals.filter((x) => x.id === id)[0];

    sessionPersistence.set('idModal', id);
    modal.open();
  }

  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }
}
