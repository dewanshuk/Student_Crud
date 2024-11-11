import axios from "axios"
import { axiosInstance } from "."


export const getAllStudents = () => async(dispatch) => {
    try{
        const response =await axiosInstance.get('/api/user/all')
        dispatch({type:'getStudents',payload:response.data})
    }
    catch(err){
        console.log(err)
    }
}


export const getStudentById = () =>{
    
}


export const updateStudent = (edit,id)=> async (dispatch) =>{
    const editObj= {studentInfo:edit}
    //console.log(edit,"ehehhee")
    console.log(id)
    try{
        const response = await axiosInstance.put(`/api/user/${id}`,editObj)
        console.log(edit.id)
        console.log(response)
        dispatch({type:"editDetails",payload:"Student Updated Successfully"})
    }
    catch(err){
        console.log(err);
    }
    
}

export const deleteStudent = async(id) =>{
    try{
        const response = await axiosInstance.delete(`/api/user/${id}`)
       dispatch({type:"getStudents",payload:"Student deleted Successfully"})
    }
    catch(err){
        console.log(err);
    }
    
}


export const createStudent = (data) => async (dispatch) =>{
    try{
        const response = await axiosInstance.post('/api/user/create',data)
        dispatch({type:"createStudent",payload:"Student Created Successfully"})
    }
    catch(err){
        console.log(err);
    }
}