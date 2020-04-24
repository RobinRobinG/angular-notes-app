import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoteCardComponent } from './note-card/note-card.component';

@NgModule({
  declarations: [AppComponent, NotesListComponent, MainLayoutComponent, NoteCardComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  exports: [NoteCardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
