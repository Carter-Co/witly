import express from 'express';
import multer from 'multer';
import {
    createPersonFormController,
    createPersonController,
    fetchPeopleController,
    fetchPersonController
} from '../controllers/people.js'
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
router.get('/', fetchPeopleController)
router.get('/profile', createPersonFormController)
router.post('/profile', upload.single('photo'), createPersonController)
router.get('/profile/:id', fetchPersonController)
export default router;

// import express, { Router } from 'express'
// import multer from 'multer';
// import { fetchPerson } from '../api/people.js';
// import { fetchPeopleController, fetchPersonController, createPersonController } from '../controllers/people.js'

// const peopleRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//           cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//           cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// peopleRouter.get('/', fetchPeopleController)
// peopleRouter.get('/profile/:id', fetchPersonController)
// peopleRouter.post('/profile', upload.single('photo', createPersonController))
// peopleRouter.get('profile/:id', fetchPeopleController)

// export default peopleRouter;