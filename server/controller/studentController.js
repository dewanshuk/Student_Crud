import  isEmpty  from "lodash/isEmpty.js";
import { studentService } from "../services/studentServices.js";


export const createStudentController = async (req,res) =>{
    
    const {name,age,email,marks} = req.body;

    const user =await studentService.createStudent(name,age,email,marks)

    return res.status(201).json({
        message:"User Created Successfully",
        status:"Success"
    })
}

export const getAllStudents = async (req,res) =>{
    
    const allStudents = await studentService.getStudents();

    if(!allStudents){
        return res.status(500).json({
            message:"Student Fetch Failed",
            status:"Failed"
        })
    }

    return res.status(200).json({
        message:"Fetch Students Successfull",
        status:"Success",
        data:allStudents
    })
}

export const getStudent = async (req,res) =>{
    const {id} = req.params;
    const studentDetails = await studentService.getStudent(id)

    if(!studentDetails){
        return res.status(500).json({
            message:"Failed to Fetch user details",
            status:"Failed"
        })
    }

    return res.status(200).json({
        message:"Student details fetched successfully",
        status:"Success",
        data:studentDetails
    })

}


export const updateStudent = async (req,res) =>{
    const {id} = req.params;
    const {studentInfo} = req.body;

    
    await studentService.updateStudent(id,studentInfo);

    return res.status(200).json({
        message:'User details updated',
        status: 'Success'
    })
}


export const deleteStudent = async (req,res) => {
    const {id} = req.params;
    
    const deletedStudent = await studentService.deleteStudent(id);

    if(isEmpty(deletedStudent)){
        return res.status(500).json({
            message:"Failed to delete Student",
            status:"Failed"
        })
    }

    return res.status(200).json({
        message:"Student Record Deleted",
        status:"Status"
    })
}