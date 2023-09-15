import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SseClient } from 'ngx-sse-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveDemoClient';
  msgData: any[] = [];
  constructor(private sseClient: SseClient) {
    // const headers = new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`);


    this.sseClient.stream('http://localhost:8080/weatherstream', { keepAlive: true, reconnectionDelay: 1_000, responseType: 'event' }, {}, 'GET').subscribe((event) => {
      if (event.type === 'error') {
        const errorEvent = event as ErrorEvent;
        console.error(errorEvent.error, errorEvent.message);
      } else {
        const messageEvent = event as MessageEvent;
        console.info(`SSE request with type "${messageEvent.type}" and data "${messageEvent.data}"`);
        this.msgData.push(messageEvent.data);

      }
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


}
