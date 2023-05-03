import { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export enum SelectionMode {
  None,
  Single,
  Multiple,
}

export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree.component.html',
  styles: [
    `
    ul{
      margin: 0 0 0 .25rem;
      padding: 0 0 0 1.25rem;
      user-select: none;
    }
    span {
      cursor: pointer;
    }
    .lined{
      border-left: 2px solid red;
    }
    .div{
      overflow: hidden;
      transition: .3s;
    }
    .hide{
      max-height: 0;
    }
    `,
  ],
})
export class TreeViewComponent implements OnInit {
  @Input() nodes: TreeNode[];
  @Input() selectable = false;
  @Input() rootNode = true;
  @Input() expandAllSubject = new Subject();
  @Input() collapsellSubject = new Subject();
  @Input() expanded = false;
  @Output() nodeSelected = new EventEmitter<TreeNode>();

  expandedNodes: TreeNode[] = [];

  ngOnInit() {
    this.expandAllSubject.subscribe((_) => this.expandAll());
    this.collapsellSubject.subscribe((_) => this.collapseAll());
    if (this.expanded) {
      this.expandAllSubject.next();
    }
  }

  toggleNode(node: TreeNode) {
    if (!node.children?.length) {
      return;
    }
    if (this.nodeExpanded(node)) {
      this.expandedNodes.splice(this.expandedNodes.indexOf(node), 1);
    } else {
      this.expandedNodes.push(node);
    }
  }

  nodeExpanded(node: TreeNode): boolean {
    return this.expandedNodes.indexOf(node) !== -1;
  }

  onNodeSelected(node: TreeNode) {
    this.nodeSelected.emit(node);
  }

  expandAll() {
    this.expandedNodes = [];
    this.expandRecursive(this.nodes);
  }

  collapseAll() {
    this.expandedNodes = [];
    this.collapseRecursive(this.nodes);
  }

  private expandRecursive(nodes: TreeNode[]) {
    for (const node of nodes) {
      this.expandedNodes.push(node);
      if (node.children) {
        this.expandRecursive(node.children);
      }
    }
  }

  private collapseRecursive(nodes: TreeNode[]) {
    for (const node of nodes) {
      const index = this.expandedNodes.indexOf(node);
      if (index !== -1) {
        this.expandedNodes.splice(index, 1);
      }
      if (node.children) {
        this.collapseRecursive(node.children);
      }
    }
  }
}
