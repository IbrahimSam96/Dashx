import "../Style.css";
import Navbar from "../Components/NavigationBar";
//Firebase Authentication
import '../FirebaseIntialization' 
import {AuthProvider} from "../Authenticator"
import Head from 'next/head';

function MyApp({ Component, pageProps }) {


 return (

<>

<AuthProvider>

<div className="Main">

<Head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
</Head>

<Navbar {...pageProps}  />

<Component {...pageProps} />

</div>

</AuthProvider>

</>

)


}

export default MyApp


