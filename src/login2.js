import React, { Component } from "react";
import bg from "./bg.png";
import logo from "./loogo.jpeg";

import "./App.css";

const App=()=>   {
 
    return (
      <div  
      style={{
          width:'100%',
          height:'100vh',
          backgroundImage:'url('+bg+')',
          backgroundSize:'cover', 
          flexDirection:'row'
      }}
      >
        {/* <header
        style={{
            height:'10vh',
            
            width:'100%', 
        }}
        className="App-header">
          <img src={logo} style={{
              width:'15%',
              margin:'3%'
          }}/>
          
        </header> */}

 


        </div>

         
    );
  }
 

export default App;