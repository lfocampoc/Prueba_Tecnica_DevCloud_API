import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private messageSubject = new Subject<string>(); // Subject para emitir los mensajes a los suscriptores

  constructor() {}

  // Conectar al WebSocket
  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      this.messageSubject.next(message); // Emitir el mensaje a los suscriptores
    };

    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    this.socket.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };
  }

  // Método para que los componentes se suscriban a los mensajes WebSocket
  getMessages() {
    return this.messageSubject.asObservable();
  }

  // Enviar un mensaje al servidor
  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  // Cerrar la conexión WebSocket
  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
