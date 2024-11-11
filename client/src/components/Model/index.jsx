import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material';
import { useForm } from "react-hook-form" 
import { createStudent, getAllStudents, updateStudent } from '../../services/studentService';
import { studentContext } from '../../context';
import get from 'lodash/get';
import  isEmpty  from 'lodash/isEmpty';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

const Container = styled('form')({

    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    '&> input':{
        marginBottom:"1rem",
        padding:"8px",
        border:"1px solid black",
        borderRadius:"5px"
    },
    '& > label':{
        fontWeight:"600"
    },
    "& > p":{
        color:'green'
    }

})


export default function Model({open,setOpen}) {
  const handleOpen = () => {
    reset();
        setOpen(true)
    };

  const {state,dispatch} = React.useContext(studentContext);
  console.log(state);
  const editDetails = get(state,'editDetails',{})

  const handleClose = () => {
   
    setOpen(false)
    reset();
    };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function handleFormValues (data){
    console.log(data,"details from edit ")
    reset();
  
    if(editDetails){
        console.log(state.editDetails,'in edit details')
        updateStudent(data,editDetails.id)(dispatch)
            setOpen(false);
           
    } 
   
    createStudent(data)(dispatch)
    setTimeout(()=>{
    reset();
    setOpen(false);
    },3000)


  }
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2>Add New Student</h2>
            <Container onSubmit={handleSubmit(handleFormValues)}>
                <label>Student Name</label>
                <input {...register('name')} defaultValue={editDetails && editDetails.name} ></input>
                <label>Student Email</label>
                <input {...register('email') } defaultValue={editDetails && editDetails.email}></input>
                <label>Student Age</label>
                <input {...register('age')} type='number' defaultValue={!isEmpty(editDetails) && editDetails.age}></input>
                <label>Student Marks</label>
                <input {...register('marks')} type='number' defaultValue={!isEmpty(editDetails) && editDetails['Mark.mark']}></input>
                <p>{state.studentCreation}</p>
                <Button variant='contained' type='submit'>Submit</Button>
              
            </Container>
        </Box>
      </Modal>
    </div>
  );
}
