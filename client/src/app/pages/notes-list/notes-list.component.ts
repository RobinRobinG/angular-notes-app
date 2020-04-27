import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        animate(
          '50ms',
          style({
            height: '*',
            marginBottom: '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*'
          })
        ),
        animate(90)
      ]),
      transition('* => void', [
        animate(
          50,
          style({
            transform: 'scale(1.05)'
          })
        ),
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75
          })
        ),
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0
          })
        ),
        animate(
          '150ms ease-out',
          style({
            height: 0,
            marginBottom: '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*'
          })
        )
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0
            }),
            stagger(100, [animate('0.2s ease')])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {
  faSearch = faSearch;
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notesService.getAll();
  }

  deleteNote(note: Note) {
    const noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
  }

  generateNoteUrl(note: Note) {
    const noteId = this.notesService.getId(note);
    return noteId;
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    terms.forEach((term) => {
      const results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    });

    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr): Array<any> {
    const uniqueResults: Set<any> = new Set<any>();
    arr.forEach((item) => uniqueResults.add(item));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    const relevantNotes = this.notes.filter((note) => {
      if (
        (note.body && note.body.toLowerCase().includes(query)) ||
        (note.title && note.title.toLowerCase().includes(query))
      ) {
        return true;
      }
      return false;
    });
    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    const noteCountObj: object = {};
    searchResults.forEach((note) => {
      const noteId = this.notesService.getId(note);

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      const aId = this.notesService.getId(a);
      const bId = this.notesService.getId(b);

      const aCount = noteCountObj[aId];
      const bCount = noteCountObj[bId];
      return bCount - aCount;
    });
  }
}
