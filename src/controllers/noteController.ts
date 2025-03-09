import { Request, Response, NextFunction } from 'express';
import Note from '../models/Note';

// Get all notes
export const getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    next(error);
  }
};
