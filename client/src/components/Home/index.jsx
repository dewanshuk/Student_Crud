import { Button, styled } from "@mui/material";
import StudentTable from "../Table";
import { useContext, useEffect, useState } from 'react';
import { getAllStudents } from '../../services/studentService';
import { studentContext } from "../../context";
import Model from "../Model";

export default function Home() {
  const {dispatch,state} = useContext(studentContext);
  const [open, setOpen] = useState(false);
  const [deleted,setIsDeleted] = useState(false)
  useEffect( ()=>{
     getAllStudents()(dispatch);
     
  },[open,deleted])  
  return (
    <Box>
    <h1>All Students</h1>
    <Container>
      <input disabled="true" placeholder="QA"></input>
      <Button variant="contained" onClick={()=>setOpen(!open)}>Add New Student</Button>
    </Container>
    <StudentTable  open = {open} setOpen = {setOpen} setIsDeleted={setIsDeleted} deleted={deleted}/>
    <Model open = {open} setOpen = {setOpen} />
    </Box>

  );
}



const Box = styled('div')({
  margin:'1.5rem',
})
const Container = styled('div')({
  display:'flex',
  flexDirection:"row",
  justifyContent:"space-between",
  margin:"1rem 0 1rem 0"
})