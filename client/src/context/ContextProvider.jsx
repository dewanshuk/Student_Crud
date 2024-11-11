import { studentContext } from "."
import { useReducer } from "react"

const initialState = {
    studentDetails:[],
    studentCreation : null,
    editDetails:{},
}
export default function ContextProvider ({children}){
    const [state,dispatch] = useReducer(reducer,initialState);

    function reducer (state=initialState,action){
        switch(action.type){
            case 'getStudents':
                 return {...state,studentDetails:action.payload.data}
            case 'createStudent':
                return {...state,studentCreation:action.payload}
            
            case 'editDetails':
                return {...state,editDetails:action.payload}

            case 'deleteStudentRecord':
                return {...state,deleteRecord:action.payload}
                    
            default:    
                return null;
        }
    }
    return(
        <studentContext.Provider value={{state:state,dispatch:dispatch}}>
            {children}
        </studentContext.Provider>
    )
}