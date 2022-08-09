import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import create from './create.svg'

function CreatePost() {

  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: ""
  })

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);


  const handelChange = (event)=> {
    const {name, value} = event.target;
    setPost(prev => {
      return ({
        ...prev,
        [name]:value
      })
    })
  }

  const handelSubmit = (event) => {
    event.preventDefault();

    axios.post('/create', post)
    .then(res => console.log(res))
    .catch(erorr => console.log(erorr))

    handleReset()
    navigate("posts")
  }

  const handleReset = () => {
   
    var des = document.getElementById("description")
    des.value = ''
    post.title = ''
    var name = document.getElementById("name")
    post.description = ''
    name.value = ''

  };

  return (
    <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
        <h1 style={{marginTop:"2rem"}}>CreatePost</h1>
        <img src={create} alt="ErrorHomeImage" width="300px" height="300px"/>

        <Form>
          <Form.Group>
            <Form.Control autoComplete="off" id="name" ref={titleRef} onChange={handelChange} style={{marginBottom: "1rem"}} placeholder="Enter your title" name="title" value={post.title} />
            <Form.Control autoComplete="off" id="description" ref={descriptionRef} onChange={handelChange} style={{marginBottom: "1rem"}} placeholder="Enter your description" name="description"  value={post.description} />
          </Form.Group>
          <Button 
            style={{width:"100%"}}
            variant="outline-success" 
            onClick={handelSubmit}
            >
              Posting now
          </Button>
        </Form>

        <div style={{display:"flex",width:"100%"}}>
        <Button 
          style={{width:"100%", marginTop:"1rem"}} 
          variant="outline-dark" 
          onClick={() => navigate("/")}
          >
            Back
          </Button>

          <Button 
          style={{width:"100%", marginTop:"1rem", marginLeft:"1rem"}} 
          variant="outline-info" 
          onClick={() => navigate("/create/posts")}
          >
            Posts
          </Button>
        </div>
    </div>
  )
}

export default CreatePost