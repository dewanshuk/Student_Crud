
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useEffect } from 'react';
import { studentContext } from '../../context';
import { deleteStudent } from '../../services/studentService';
import { useState } from 'react';

export default function StudentTable ({open,setOpen,deleted,setIsDeleted}){

    const {state:{studentDetails},dispatch} = useContext(studentContext);
    const [studentInfo,setStudentInfo] = useState([]);
    const RECORDPERPAGE = 5;
    const NUMBEROFPAGES = Math.round(studentDetails.length/RECORDPERPAGE)

    function pagination (pageNumber){
      const start = (pageNumber - 1) * RECORDPERPAGE;
      const end = pageNumber * RECORDPERPAGE;
      const newArray = studentDetails.slice(start,end);
      setStudentInfo(newArray);
    }
    function handleEdit(rowData){
      dispatch({type:"editDetails",payload:rowData})
      setOpen(true)
    }
    function handleDelete(row){
      dispatch({type:'deleteStudentRecord',payload:row.id})
      deleteStudent(row.id)
      setIsDeleted(true)
      
    }

    useEffect(()=>{
      pagination(1);
    },[studentDetails])
    return(
      <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Student Name</StyledTableCell>
            <StyledTableCell align="left">Student Email</StyledTableCell>
            <StyledTableCell align="left">Student Age</StyledTableCell>
            <StyledTableCell align="left">Marks</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentInfo.map((row) => (
            <StyledTableRow key={row.id}>
                 <StyledTableCell component="th" scope="row" align='left'>
                {row.id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='left'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.age}</StyledTableCell>
              <StyledTableCell align="left">{row['Mark.mark']}</StyledTableCell>
              <StyledTableCell align="left">
                <button onClick={()=>{handleEdit(row)}}>✏️</button>
                {"  "}
                <button onClick={()=>handleDelete(row)}>🗑️</button>

              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <PaginationBox>
    {
     NUMBEROFPAGES && Array(NUMBEROFPAGES).fill(1).map((_,idx)=>(
          <button onClick={()=>pagination(idx+1)}>{idx+1}</button>        
      ))
    }
    </PaginationBox>
    </>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PaginationBox = styled('div')({
  marginTop:"1rem",
  display:"flex",
  justifyContent:"flex-end",
  "& > button":{
    marginRight:"6px",
    padding:"2px 10 px"
  }
})