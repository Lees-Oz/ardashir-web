import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

const SERVER_URL = 'ws://localhost:4567/ws';

@Injectable()
export class SocketService {
  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  connect(): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(SERVER_URL);
      console.log("Successfully connected: " + SERVER_URL);
    } 
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('! next !' + data);
          //ws.send(JSON.stringify(data));
        }
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}