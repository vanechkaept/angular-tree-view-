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
import { TreeNode } from './tree.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  treeNodes: TreeNode[] = [
    {
      label: 'Node 1',
      children: [
        {
          label: 'Node 1.1',
          children: [],
        },
        {
          label: 'Node 1.2',
          children: [
            {
              label: 'Node 1.2.1',
              children: [],
            },
            {
              label: 'Node 1.2.2',
              children: [],
            },
          ],
        },
      ],
    },
    {
      label: 'Node 2',
      children: [
        {
          label: 'Node 2.1',
          children: [],
        },
        {
          label: 'Node 2.2',
          children: [],
        },
      ],
    },
  ];

  selectionMode: string = 'Single';

  onNodeSelected(selectedNode: TreeNode) {
    console.log('Selected node:', selectedNode);
  }
}
