import "../Style.css"
import Navbar from "../Components/NavigationBar"
//Firebase Authentication
import '../FirebaseIntialization' 
import {AuthProvider} from "../Authenticator"


function MyApp({ Component, pageProps }, props) {

 return (

<>
<AuthProvider>
<div className="Main">  

<Navbar {...pageProps} />
<Component {...pageProps} />
</div>
  
</AuthProvider>
</>

)


}

export default MyApp


