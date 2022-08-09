import React from 'react'
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import team from './team.svg'

function App() {
  const navigate = useNavigate();
  return (
    <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
      <h1 style={{marginTop:"2rem"}}>Hi In React FrontEnd</h1>
      <img src={team} alt="ErrorHomeImage" width="300px" height="300px"/>
      <Button
      variant="outline-dark"
      style={{width:"100%"}} 
      onClick={()=> navigate("create")}
      >
        Create Post
      </Button>

      <Button 
          style={{width:"100%", marginTop:"1rem"}} 
          variant="outline-info" 
          onClick={() => navigate("/create/posts")}
          >
            Posts
      </Button>
    </div>
  );
}

export default App;
