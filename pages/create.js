import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AddIcon from '@material-ui/icons/Add';
import WidgetsIcon from '@material-ui/icons/Widgets';
import {useEffect} from "react"
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";

export const getServerSideProps = async (context) => {
    try {
      const cookies = nookies.get(context);
      console.log(JSON.stringify(cookies, null, 2));
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid, email } = token;
  
      // the user is authenticated!
      // FETCH STUFF HERE
  
      return {
        props: {  email, uid , token},
  
        // redirect: {
        //   permanent: false,
        //   destination: "/create"
        // }
  
      };
    } catch (err) {
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      return {
        props: {} ,
      };
    }
  };


const Create = (props) => {

    console.log(props.email)

return (

<div className="createPage">

<div className="WorkSpace">

</div>
      
<div className="designBar">

<span className="designBar1" >
Layout 
<AspectRatioIcon onClick={() => {
const  div =  document.getElementById("designBar1Options"); 

      if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
}}/>
</span>


<span id="designBar1Options">

</span>

<span className="designBar2">
Charts 
<AddIcon onClick={()=> console.log("Ayre")}/>
</span>

<span className="designBar3">
Widgets 
<WidgetsIcon onClick={()=> console.log("Ayre")}/>
</span>

</div>
    
</div>

)
}

export default Create; 