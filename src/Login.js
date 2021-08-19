import React, { Component,useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Form, Button, Container, Card, Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {signin} from './actions/auth'
import logo from './logo22.jpeg'


import {useDispatch,connect} from 'react-redux'
import axios from 'axios';

  const Login=(props)=>{ 

    const [nickname,setNickname]=useState('')
    const [password,setPassword]=useState('')
    const [logined,setLogin]=useState(false)
    
    const [error,seterror]=useState(false)
    
    const [errorS,seterrorMessage]=useState('')
   const handlesubmit=async(e)=>{
        e.preventDefault();
     //  this.props.signin (this.state.nickname)
     const config = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
      }
      if(nickname ==''){
        seterror(true)
        seterrorMessage('Nickname is required')   
        return  
    }
      if(password===''){
            
        seterror(true)
        seterrorMessage('Password is required')     
        return
    }else{
        
        seterror(false)
        seterrorMessage('')  
    }
    await axios.post('https://frozen-island-11321.herokuapp.com/https://testcccvd.herokuapp.com/login'
     ,{
        'nickname': nickname
     }, config)

     .then(async function(response) {
         console.log(response)
        if(response.statusText==='OK'){
           
    props.history.push('/home')
    }
        else if(response.status===201){
            
        seterror(true)
        seterrorMessage('No User with this nickname exits') 
        }

         
	}).catch(function(e){
        
        seterror(true)
        seterrorMessage(e) 
	 	console.log(e);
	});
 
	 	 
     
     // this.props.history.push('/home') 
       }
      const nicknamehandler = event =>{
         setNickname( event.target.value)
    }
   const passwordhandler = (event) =>{
    setPassword( event.target.value)
    }  
        return (
            <div className="formcontainer modal-dialog-centered">
              
              <div>
                <img className="logo" src={logo} alt="logo"/>
                </div>  <div className="formarea rounded-lg shadow-lg">
                
                    <Form className="form" onSubmit={handlesubmit}> 
                        <h3 className="align-items-center text-primary text-danger mb-3 p-3 text-center">Login</h3>
                      
                        {
                    error?<p style={{
                        color:'red'
                    }}>{errorS}</p>:<p></p>
                    }
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Nickname:</Form.Label>
                            <Form.Control type="text" placeholder="jerry" value={nickname} onChange={nicknamehandler} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={passwordhandler}/>
                        </Form.Group>
                        
                        <Button className=" mt-2 btn-block bg-danger w-100" type="submit">
                            Login
                        </Button>
                        <div className="text-center m-sm-3">
                            Create a new Account <Link to="/signup">Sign up</Link>
                            </div> 
                    </Form>
                </div>
          </div>
        );
    }


 

export default  Login;