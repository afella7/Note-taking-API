import { Request, Response, NextFunction } from "express";
import Note from "../models/Note";
import Category from "../models/Category";

// Get a single note by ID
export const getNote = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const note = await Note.findById(req.params.id).populate("category");
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { title, content, category } = req.body;

        // Check if the category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const newNote = new Note({ title, content, category });
        await newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

// Update a note
export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { title, content, category } = req.body;

        // Validate category
        if (category) {
            const existingCategory = await Category.findById(category);
            if (!existingCategory) {
                return res.status(400).json({ message: "Invalid category ID" });
            }
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content, category }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error);
    }
};
