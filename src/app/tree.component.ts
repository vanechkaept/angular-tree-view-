import { Component, Input, Output, EventEmitter } from '@angular/core';

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
      padding: 0 0 0 1.5rem;
      user-select: none;
    }
    span {
      cursor: pointer;
    }
    .lined{
      border-left: 2px solid red;
    }
    `,
  ],
})
export class TreeViewComponent {
  @Input() nodes: TreeNode[];
  @Input() selectable = false;
  @Input() rootNode = true;
  @Output() nodeSelected = new EventEmitter<TreeNode>();

  expandedNodes: TreeNode[] = [];

  toggleNode(node: TreeNode) {
    if (node.children) {
      if (this.nodeExpanded(node)) {
        this.expandedNodes.splice(this.expandedNodes.indexOf(node), 1);
      } else {
        this.expandedNodes.push(node);
      }
    }
  }

  nodeExpanded(node: TreeNode): boolean {
    return this.expandedNodes.indexOf(node) !== -1;
  }

  onNodeSelected(node: TreeNode) {
    this.nodeSelected.emit(node);
  }
}
