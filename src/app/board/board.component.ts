import { Component, OnInit } from '@angular/core';
import { Note, NoteService } from './note.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  selectedNoteBuffer: Note | null = null;
  selectedIndex: number | null = null;
  showAddNoteModal = false;
  showEditNoteModal = false;
  author = '';
  content = '';
  isAuthorValid = true;
  isContentValid = true;
  isSubmit = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  selectNote(note: Note, index: number): void {
    this.selectedNote = note;
    this.selectedNoteBuffer = { author: note.author, content: note.content, date: note.date };
    this.selectedIndex = index;
  }

  addNote(): void {
    if (!this.author.trim() || !this.content.trim()) {
      this.isAuthorValid = this.author.trim() !== '';
      this.isContentValid = this.content.trim() !== '';
      return;
    }

    const newNote: Note = { author: this.author, content: this.content, date: new Date() };
    this.noteService.addNote(newNote);
    this.notes.push(newNote);
    this.author = '';
    this.content = '';
    this.isAuthorValid = true;
    this.isContentValid = true;
    this.isSubmit = false;
  }

  updateNote(): void {
    if (this.selectedNote && this.selectedIndex !== null) {
      const updatedNote: Note = { ...this.selectedNote, date: new Date() };
      this.noteService.updateNote(this.selectedIndex, updatedNote);
      this.notes[this.selectedIndex] = updatedNote;
      this.selectedNote = null;
      this.selectedIndex = null;
    }
  }

  cancelUpdate(): void {
    if (this.selectedIndex !== null && this.selectedNoteBuffer !== null) {
      this.notes[this.selectedIndex] = this.selectedNoteBuffer;
    }
    this.selectedNote = null;
    this.selectedNoteBuffer = null;
    this.selectedIndex = null;
  }

  cancelAdd(): void {
    this.showAddNoteModal = false;
    this.isSubmit = false;
  }

  deleteNote(): void {
    if (this.selectedIndex !== null) {
      this.noteService.deleteNote(this.selectedIndex);
      this.notes.splice(this.selectedIndex, 1);
      this.selectedNote = null;
      this.selectedIndex = null;
    }
  }

  get sortedNotes() {
    return this.notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  alert(content: string) {
    console.log(this.selectedNote?.content);
    console.log(content);
  }

  onAuthorContentChange(): void {
    this.isAuthorValid = this.author.trim() !== '';
    this.isContentValid = this.content.trim() !== '';
  }
}
