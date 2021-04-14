import "../Style.css"
import Navbar from "../Components/NavigationBar"
//Firebase Authentication
import '../FirebaseIntialization' 
import {AuthProvider} from "../Authenticator"


function MyApp({ Component, pageProps }, props) {

 return (

<>
<AuthProvider>
<Navbar {...pageProps} />

<div className="Main">  
<Component {...pageProps} />
</div>
  
</AuthProvider>
</>

)


}

export default MyApp


