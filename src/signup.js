import React, { Component,useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Form, Button, Container, Card, Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import logo from './logo22.jpeg'
import axios from 'axios';

const Signup=(props)=>{

    const [email,setemail]=useState('')
    const [pass,setpass]=useState('')
    const [nickname,setnickname]=useState('')
    const [error,seterror]=useState(false)
    
    const [errorS,seterrorMessage]=useState('')

    const signupHandle=async(e)=>{

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
        if(email===''){
            
            seterror(true)
            seterrorMessage('enter valid email') 
            return
        }
        else{
        const rr =   validateEmail(email)
        if(!rr){
            
            seterror(true)
        seterrorMessage('enter valid email') 
        return
        }}
        if(pass===''){
            
            seterror(true)
            seterrorMessage('Password is required')     
            return
        }else{
            
            seterror(false)
            seterrorMessage('')  
        }
        await axios.post('https://frozen-island-11321.herokuapp.com/https://testcccvd.herokuapp.com/signup'
        ,{
           'nickname': nickname
        }, config)
   
        .then(async function(response) {
            console.log(response)
           if(response.statusText==='OK'){
              
       props.history.push('/home')
       } 
   
            
       }).catch(function(e){
            console.log(e);
       });
    

    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
        return (
            <div className="formcontainer modal-dialog-centered">
               
               <div>
                <img className="logo" src={logo} alt="logo"/>
                </div>  
                
                 <div className="formarea rounded-lg shadow-lg">
                
                    <Form className="form"  > 
               


                    <h3 className="align-items-center text-primary mb-1 p-3 text-danger text-center">Sign up</h3>
                    {
                    error?<p style={{
                        color:'red'
                    }}>{errorS}</p>:<p></p>
                    }

                        <Form.Group className="mb-2" controlId="formBasicnickname">
                            <Form.Label>Nickname:</Form.Label>
                            <Form.Control class="form-control input-sm" type="text"value={nickname} onChange={(e)=>setnickname(e.target.value)} 
                             placeholder="jerry" />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control class="form-control input-sm" type="email" value={email} onChange={(e)=>setemail(e.target.value)}  placeholder="example@example.com" />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control class="form-control input-sm" type="password"value={pass} onChange={(e)=>setpass(e.target.value)}  placeholder="Password" />
                        </Form.Group>
                        
                        <Button className="mt-2 btn-block bg-danger w-100" onClick={signupHandle}  >
                            Login
                        </Button>
                        <div className="text-center m-sm-3">
                            Already have account? <Link to="/">Sign in</Link>
                            </div>   
                    </Form>
                </div>
          </div>
        );
    }
 

export default Signup;