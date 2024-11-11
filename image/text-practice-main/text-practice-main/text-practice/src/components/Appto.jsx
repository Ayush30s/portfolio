
import Outlet from "react-router-dom"
import Header from './header';
// import App from "../App";
const Appto = () => {
    return ( <div>
       <Header/>
       <Outlet/>
       
    </div>) 
    
}

export default Appto;