import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router()

router.get('/get', userAuth, noteController.getAllNote);
//route to create a new note
router.post('/create', newNoteValidator, userAuth, noteController.createNote);

//route to get a single note by their user id
router.get('/:_id', userAuth, noteController.getNoteById);

//route to update a single note by their user id
router.put('/:_id', newNoteValidator, userAuth, noteController.updateNote);

//route to delete a single note by their user id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archieve a note
router.put('/archive/:_id', userAuth, noteController.archiveNote);

//route to trash a note
router.put('/trash/:_id', userAuth, noteController.trashNote);

export default router;