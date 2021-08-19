import React, { Component } from 'react';
import Game1 from './games/game1';
import Game2 from './games/game2';

import Game3 from './games/game3';
import Game4 from './games/game4';
import Game5 from './games/game5';
import Game6 from './games/game6';
import Game7 from './games/game7';
import Game8 from './games/game8';
import Game9 from './games/game9';
import './App.css'
import { Prev } from 'react-bootstrap/esm/PageItem';

class home extends Component {
    
    constructor(props) {
        super(props);

       this.state = {
           index : 0
       }

    }
    
 game(index) {

        // if(index.index === 0){
        //   return <Game1/>;
        // }else if (index.index === 1){
        //   return <Game2 />;
        // }
       
        switch (index.index) {
            case 0:
                return <Game1/>;
                break;
                case 1:
                    return <Game2/>;
                    break;
                    case 2:
                        return <Game3/>;
                        break;
                        case 3:
                            return <Game4/>;
                            break;
                            case 4:
                                return <Game5/>;
                                break;
                                case 5:
                                    return <Game6/>;
                                    break;
                                    case 6:
                                        return <Game7/>;
                                        break;
                                        case 7:
                                            return <Game8/>;
                                            break;
                                            case 8:
                                            return <Game9/>;
                                            break;

            default:
                break;
        }
    }
     
    
        render() {
     

        return (
            <div className="home" >
                 
                 <input className="innerhomebtn  btn-outline-secondary" type="button" value="previous" onClick={()=>{
                    if(this.state.index>0)
                    this.setState(prevState =>({
                        index : prevState.index-1
                    }))
                   
                    }}></input>  
                <div className="innerhome"><this.game index = {this.state.index}/></div>
                 <input className="innerhomebtn" type="button" value="Next"onClick={()=>{
                    if(this.state.index<8)
                    this.setState(prevState =>({
                        index : prevState.index+1
                    }))
                    
                   }}></input>
              
            </div>
        );
    }
}

export default home;