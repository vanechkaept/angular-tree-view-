import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TreeViewComponent } from './tree.component';

const routes = [
  {
    path: 'aa/aa',
    component: AppComponent,
  },
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, TreeViewComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
