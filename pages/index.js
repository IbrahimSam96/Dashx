import Head from 'next/head'
import { useRouter } from 'next/router'

import nookies from "nookies";

// Admin service account/ FirebaseSDK 
import { firebaseAdmin } from "../firebaseAdmin";
// import { firebaseClient } from "../firebaseClient";



export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: {  email, uid },
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

const Main = (props) => {

  console.log(props.email)
  
  return (


    <div>

      <Head>
        <title> Create Free Financial Graphs, Interactive Dashboards, and Live Reports --GraphX </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

  

    </div>
  )

}

export default Main




