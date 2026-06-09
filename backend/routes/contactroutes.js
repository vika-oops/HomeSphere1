import express from 'express';
import { createContact, getContacts, replyContact, deleteContact } from '../controllers/contactcontroller.js';
import { authorize, protect } from '../middlewares/authmiddleware.js';

const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/", protect, authorize("admin"), getContacts);

export default contactRouter;