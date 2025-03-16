import express from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote, getNotesByCategory } from '../controllers/noteController';
import { validateNote } from '../middleware/validateNote';
import { requestLogger } from '../middleware/logger';

const router = express.Router();

router.use(requestLogger); // Apply logging middleware

router.get('/notes', getNotes);
router.get('/notes/:id', getNote);
router.post('/notes', validateNote, createNote);
router.put('/notes/:id', validateNote, updateNote);
router.delete('/notes/:id', deleteNote);
router.get('/notes/categories/:categoryId', getNotesByCategory);

export default router;

