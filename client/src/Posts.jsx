import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import post from './post.svg'
import update from './update.svg'

function Posts() {

    // Fro updata datebase
    const [updatePosts, setUpdatePosts] = useState({})

    // Fror modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // For navigate
    const navigate = useNavigate();

    // for set  post from database
    const [posts, setPost] = useState([])

    // for get request from database then set post in setPost array
    useEffect(()=> {
        axios.get('/posts')
        .then((res) => {
            console.log(res);
            setPost(res.data)
        })
        .catch((err) => console.log(err))
    }, []);
    

    // for dalete post from database
    const deletePost = (id) => {
        console.log(id);

        axios.delete(`/delete/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        window.location.reload();
    }

    // for updatePost from database
    const updatePost = (post) => {
        console.log(post);
        setUpdatePosts(post);
        handleShow();
    }

    const handelChange = (e) => {
        const {name, value} = e.target;

        setUpdatePosts((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const saveUpdatePost = () => {
        axios.put(`/update/${updatePosts._id}`,updatePosts)
        .then(res => console.log(res))
        .catch(erorr => console.log(erorr));


        handleClose();
        window.location.reload();
    }

  return (
    <div style={{width:"90%", textAlign:"center", margin:"auto auto"}}>
        <h1 style={{marginTop:"2rem"}}>Posts</h1>
        <img src={post} alt="ErrorHomeImage" width="300px" height="300px"/>

        <Button  onClick={() => navigate("/")} style={{width:"100%"}} variant="outline-dark" >
            HOME
        </Button>


        <Modal style={{textAlign:"center"}} show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign:"center"}}>Edite Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img src={update} alt="ErrorHomeImage" width="200px" height="200px"/>
            <Form>
                <Form.Group>
                    <Form.Control 
                        onChange={handelChange} 
                        defaultValue={updatePosts.title ? updatePosts.title : ""} 
                        style={{marginBottom: "1rem"}} 
                        placeholder="Enter your description" 
                        name="title"
                        autoComplete="off"  />
                    <Form.Control 
                        onChange={handelChange} 
                        defaultValue={updatePosts.description ? updatePosts.description : ""} 
                        style={{marginBottom: "1rem"}} 
                        placeholder="Enter your description" 
                        name="description"
                        autoComplete="off"  />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatePost}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {posts ? (
            <>
                {posts.map((post) => {
                    return(
                        <div key={post._id} style={{border:"solid 1px lightgray", padding:"15px", marginBottom:"15px", marginTop:"15px", borderRadius:"8px"}}>
                            <h4 style={{textTransform: 'uppercase'}}>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{display:"flex", paddingTop:"20px"}}>
                                <Button onClick={() => updatePost(post)} style={{width:"100%", marginLeft:"0px"}} variant="outline-success" >
                                    Updata
                                </Button>

                                <Button onClick={()=> deletePost(post._id)} style={{width:"100%", marginLeft:"20px"}} variant="outline-danger" >
                                    Delet
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </>
        ) : ""}

    </div>
  )
}

export default Posts