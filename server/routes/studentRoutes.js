import express from 'express'
import { createStudentController, deleteStudent, getAllStudents, getStudent, updateStudent } from '../controller/studentController.js';


export const studentRouter = express.Router();


studentRouter.post('/create',createStudentController)
studentRouter.get('/all',getAllStudents)
studentRouter.get('/:id',getStudent)
studentRouter.put('/:id',updateStudent)
studentRouter.delete('/:id',deleteStudent)