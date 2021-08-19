import axios from 'axios'
import {  SERVER_LOGIN } from '../constants';
 
  
 
            export const  signin= async(nickname)=> async (dispatch) =>{
               
               await axios.post(SERVER_LOGIN,{
                    'nickname':nickname
                }).
                then(res=>{
                    console.log(res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
                        
                }


  

  