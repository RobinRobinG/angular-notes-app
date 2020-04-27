import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

@NgModule({
  declarations: [AppComponent, NotesListComponent, MainLayoutComponent, NoteCardComponent, NoteDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, FormsModule, BrowserAnimationsModule],
  exports: [NoteCardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
