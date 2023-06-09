import { OnInit, TemplateRef } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export enum SelectionMode {
  None,
  Single,
  Multiple,
}

// export interface TreeNode {
//   label: string;
//   children?: TreeNode[];
// }

export type Multidimensional<T> = T & { [key: string]: T[] };
export type MultidimensionalArray<T> = Array<Multidimensional<T>>;

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
export class TreeViewComponent<T, K> implements OnInit {
  @Input() nodes: MultidimensionalArray<T> = [];
  @Input() selectable = false;
  @Input() rootNode = true;
  @Input() childKey: string;
  @Input() expandAllSubject = new Subject();
  @Input() collapsellSubject = new Subject();
  @Input() expanded = false;
  @Input() content!: TemplateRef<unknown>;
  // @Output() nodeSelected = new EventEmitter<TreeNode>();

  private expandedNodes: Array<MultidimensionalArray<T> | Multidimensional<T>> =
    [];

  ngOnInit() {
    this.expandAllSubject.subscribe((_) => this.expandAll());
    this.collapsellSubject.subscribe((_) => this.collapseAll());
    if (this.expanded) {
      this.expandAllSubject.next();
    }
  }

  // isArray(node: MultidimensionalArray<T> | undefined): boolean {
  //   return Array.isArray(node);
  // }

  toggleNode(nodes: Multidimensional<T>) {
    console.log(nodes);
    console.log(this.expandedNodes);
    console.log('------------');
    // if (!this.isArray(nodes)) {
    //   return;
    // }

    const expandedIndex = this.expandedNodes.indexOf(nodes);
    if (this.nodeExpanded(nodes)) {
      this.expandedNodes.splice(expandedIndex, 1);
    } else {
      this.expandedNodes.push(nodes);
    }
  }

  nodeExpanded(node: Multidimensional<T>): boolean {
    return this.expandedNodes.indexOf(node) !== -1;
  }

  onNodeSelected(node: MultidimensionalArray<T>) {
    // this.nodeSelected.emit(node);
  }

  expandAll() {
    for (const node of this.nodes) {
      if (!this.nodeExpanded(node)) {
        this.expandedNodes.push(node);
      }
    }
  }

  collapseAll() {
    for (const node of this.nodes) {
      const index = this.expandedNodes.indexOf(node);
      if (index !== -1) {
        this.expandedNodes.splice(index, 1);
      }
    }
  }

  // asArray(type: MultidimensionalArray<T>): Array<T> {
  //   return type as Array<T>;
  // }
}
