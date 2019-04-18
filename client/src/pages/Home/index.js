import React, { useContext } from "react";
import Authenticate from "../Authenticate";
import Welcome from "../Welcome";
import UserContext from "../../utils/UserContext";

function Home (props) {

  const {userState} = useContext(UserContext);
  
  return(
    
      
        <div>
          {userState.loggedIn ? <Welcome/> : <Authenticate/>}
        </div>
      
    
  )
}

export default Home;
