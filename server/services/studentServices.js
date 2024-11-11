import { dbConnection } from "../db/index.js";
import Mark from "../model/MarkModel.js";
import Student from "../model/StudentModel.js";
import isEmpty from 'lodash/isEmpty.js'

class StudentService{
    constructor(){

    }

    async createStudent(name,age,email,marks){
        try{
            const userExist = await Student.findOne({
                where:{
                    email:email
                },
                raw:true,
                attributes:['email']
            })
            if(!isEmpty(userExist)) {
                console.log('Student with this email already exists')
                return;
            } ;

            const insertRecord = dbConnection.dbInstance().transaction(async(t)=>{

                const user  = await Student.create({
                    name:name,
                    age:age,
                    email:email
                },{transaction:t})
                
                const studentId = user?.get('id');
                
                await Mark.create({
                    student_id:studentId,
                    mark:marks
                },{transaction:t})
            })
           
            
            if(!isEmpty(insertRecord)){
                console.log('user Creation Failed')
                return;
            }
            return insertRecord;
        }
        catch(err){
            console.log('Error while creating student record ->',err)
        }


    }

    async deleteStudent(id){
        try{

            const deleteRecord = await dbConnection.dbInstance().transaction(async(t)=>{
                const isMarkDelete = await Mark.destroy({
                    where:{
                        student_id:id
                    }
                })
                const isDelete = await Student.destroy({
                    where:{
                        id:id
                    }
                })  
               
            })
          
            return  {deleteRecord,msg:"User deleted"} // {isDelete,isMarkDelete};  
        }
        catch(err){
            console.log('Failed to Delete User -->',err)
            return;
        }
        

        
    }

    async getStudents(){
        try{
            Student.hasOne(Mark,{
                foreignKey:'student_id'
            })
            Mark.belongsTo(Student,{foreignKey:'id'});  

            const allStudents = await Student.findAll({
                include:[{
                    model:Mark,
                    required:true,
                    attributes:['mark']
                }],
                attributes:['id','name','age','email'],
                raw:true
            })

            return allStudents;
        }
        catch(err){
            console.log('Failed to Fetch Students -> ', err)
        }
        
    }

    async getStudent(id){
        try{
            const student = await Student.findOne({
                where:{
                    id:id
                },
                attributes:['name','email','age'],
                raw:true
            }) 
            const studentMarks = await Mark.findOne({
                where:{
                    student_id:id
                },
                attributes:['mark'],
                raw:true
            })
            const studentObj = {...student,mark:studentMarks.mark}
            return studentObj;
        }
        catch(err){
            console.log('Error fetching Student Details -->',err);
            return;
        }
    }

    async updateStudent(id,studentInfo){
        try{
            const studentDetails = {name:studentInfo.name,age:studentInfo.age,email:studentInfo.email}
            const studentMark = {mark:studentInfo.marks}
            const updateDetails = await Student.update(studentDetails,{
                where:{
                    id:id
                }
            })

            const updateMarks = await Mark.update(studentMark,{
                where:{
                    student_id:id
                }
            })

            return ;
        }
        catch(err){
            console.log('Failed to update Student Details -->',err)
            return;
        }

    }

}

export const studentService = new StudentService ; 