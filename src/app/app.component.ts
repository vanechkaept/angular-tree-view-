import { Component, OnInit } from '@angular/core';
import {
  Router,
  UrlTree,
  UrlSegment,
  UrlSegmentGroup,
  PRIMARY_OUTLET,
  DefaultUrlSerializer,
  RouterState,
  ActivatedRoute,
} from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  treeNodes = [
    {
      label: 'Node 1',
      child: [
        {
          label: 'Node 1.1',
          child: [],
        },
        {
          label: 'Node 1.2',
          child: [
            {
              label: 'Node 1.2.1',
              child: [],
            },
            {
              label: 'Node 1.2.2',
              child: [],
            },
          ],
        },
      ],
    },
    {
      label: 'Node 2',
      child: [
        {
          label: 'Node 2.1',
          child: [],
        },
        {
          label: 'Node 2.2',
          child: [],
        },
      ],
    },
  ];

  expandAllSubject = new Subject<void>();
  collapsellSubject = new Subject<void>();

  selectionMode: string = 'Single';

  openAll() {
    this.expandAllSubject.next();
  }

  closeAll() {
    this.collapsellSubject.next();
  }
}
