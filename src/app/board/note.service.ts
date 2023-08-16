import { Injectable } from '@angular/core';

export interface Note {
  author: string;
  content: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesKey = 'notes';

  constructor() { }

  getNotes(): Note[] {
    const notes = localStorage.getItem(this.notesKey);
    return notes ? JSON.parse(notes) : [];
  }

  addNote(note: Note): void {
    const notes = this.getNotes();
    notes.push(note);
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }

  updateNote(index: number, updatedNote: Note): void {
    const notes = this.getNotes();
    notes[index] = updatedNote;
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }

  deleteNote(index: number): void {
    const notes = this.getNotes();
    notes.splice(index, 1);
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }

  updateNotes(notes: Note[]): void {
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }
}
