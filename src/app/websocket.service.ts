import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

// Proporcionar una implementación de respaldo si WebSocket no está definido
const WebSocketImpl = typeof WebSocket !== 'undefined' ? WebSocket : require('ws');

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket({
      url: 'wss://back-gdp-6990129e76b6.herokuapp.com/',
      WebSocketCtor: WebSocketImpl
    });
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$.asObservable();
  }
}
