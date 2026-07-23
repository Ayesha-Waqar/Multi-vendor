import axios from "axios"
import {server} from "../../server"

//==============load user==========
export const loadUser = ()=>async(dispatch)=>{
    //   console.log("loadUser called");
    try{
        dispatch({
           type :"LoadUserRequest",
        })
        const {data}=await axios.get(`${server}/user/get-user` , {withCredentials:true});
        // console.log("user login" , data)
        dispatch ({
            type:"LoadUserSuccess",
            payload : data.user , 
        })
        
    }
    catch(err){
        //  console.log(err);
//   console.log(err.response);

        dispatch({
            type : "LoadUserFail" , 
            payload : err.response.data.message
        })
    }
}
