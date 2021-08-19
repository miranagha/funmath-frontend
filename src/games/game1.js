import React, { Component } from 'react';
import Sketch from 'react-p5'

class Game1 extends Component {
    width =0;
    height =0;
     initial = true; 
     equ=[];    // holds the question of all blocks
     anw=[];    // holds the answer of all blocks
     hosX =0;
     hosY =0;
     balX =0;
     balY =0;
     bans = 0;  //bans -> ball answer
     rise =0;   //increment veriable to move ball in y direction
     run=0;   //increment veriable to move ball in x direction
     mball = {
        X: 0,
        Y: 0,
        val: 0
      };    //mball -> moving ball
      thit = [];    // hold the hit array as global
      youlose = false;
      youwin = true;
            setup = (p5, canvasParentRef) => {
                this.width = window.innerWidth*0.6;  //sets console width to 60% of the screen
                this.height = window.innerHeight*0.75;  //sets console height to 75% of the screen
                p5.createCanvas(this.width, this.height).parent(canvasParentRef);
            };
        
            draw = (p5) => {
                p5.background(255, 241, 208)
                .fill(0,0,102)
                .textSize(25)
                .textFont('Cursive')
                .text("Task :: Hit the target with right answer.", 20, 60);
                let num = (this.width/150)-1;
                let sign = ['+','-'];
                this.hosX = this.width/2 - 30;  //ball bank x-y coordinates
                this.hosY = this.height - 60;
                // this if runs every one the game restart
                if(this.initial){
                    this.balX = this.hosX + 30 ;    //ball x-y coordinates
                    this.balY = this.hosY + 30 ;
                    let eq =[];
                    let ans = [];
                    let hit = [];  //store true if the block gets hit by the ball
                    for(let i=0;i<num;i++){
                        
                        hit.push(false);      //initialize with false 
                        let a = p5.int(p5.random(49));  //a and b of question equation
                        let b = p5.int(p5.random(49));
                        let si = p5.int(p5.random(2));  // operation between a and b (+ or -)
                        if(a>b){  // always puts the greater number first to avoid negtive answer
                        eq.push(a+sign[si]+b)
                        }else{
                            a=a+b;
                            b=a-b;
                            a=a-b;
                        eq.push(a+sign[si]+b)
                        }
                     if(sign[si]==='+') //store the answer of each block in array
                        ans.push(a+b);
                        else
                        ans.push(a-b);
                    }
                    this.thit= hit;// set to that global variables
                    this.equ = eq;
                    this.anw = ans;
                    this.mball.X = this.balX; //initial position of moving ball is same is static ball
                    this.mball.Y = this.balY;
                    this.initial = false;
                    this.bans = p5.random(this.anw);// value of the ball always selected form the answer array
                }
                p5
                .textSize(22)
                .fill(0,0,102)
                .text(this.bans,this.hosX+20,this.hosY-5);
                for(let i=0;i<num;i++){ // this for loop displays the blocks
                
                    if(!this.thit[i]){  //if the corresponding hit of the block is true-> do not show the block-> means block is popped
                    p5.fill(204,204,0)
                    .noStroke()
                    .rect((i*150)+i*20,100, 135, 50)
                    .fill(50,50,255)
                    .textSize(20)
                    .textFont('Helvetica')
                    .text(this.equ[i]+"=?", (i*150)+i*20+35, 130);  //question equation on the block
                    
                    if(this.mball.X >= (i*150)+i*20 && this.mball.X <= (i*150)+(i*20)+135 && this.mball.Y <=150 && this.anw[i]===this.mball.val)// if the ball hits the (i)block and value of block is the answer of the block 
                    this.thit[i] = true;    //stores that the (i)block is hit
                    else if(this.mball.X >= (i*150)+i*20 && this.mball.X <= (i*150)+(i*20)+135 && this.mball.Y <=150)//block gets hit but value of ball is not the answer of the block.
                    {
                        this.youlose = true;    //player losses
                    }
                }
                }
                p5.fill(204,204,0)
                .square(this.hosX,this.hosY,60,20,20,0,0)//render the ball bank
                .fill(255,0,0)
                .circle(this.balX,this.balY,20);        //render the static ball
                this.mball.X+=this.run;   //moving ball x-y cord. adding x-y value in previous location
                this.mball.Y+=this.rise;
                if(this.mball.Y>100)    //if ball have not passed block than show it...otherwise dont.
                p5.fill(255,0,0)
                .circle(this.mball.X,this.mball.Y,20);
                else{   //otherwise moving ball is static
                    this.mball.X = this.balX;
                    this.mball.Y = this.balY; 
                    this.rise=0;
                this.run=0;
                }
                for(let i=0;i<num;i++){//if all the block got hit...player wins
                    if(!this.thit[i]){  
                        this.youwin = false;
                        break;
                    }else
                    this.youwin = true;
                }
                if(this.youwin){//show the victory sign
                    p5
                .textSize(30)
                .fill(0,153,0)
                .text("You Win !",(this.width/2)-60,this.height/2)
                .text("Play Again ↻",(this.width/2)-80,this.height/2+60);
                }
                if(this.youlose){
                    p5
                .textSize(30)
                .fill(255,0,0)
                .text("You Lose !",(this.width/2)-60,this.height/2)
                .text("Retry ↻",(this.width/2)-40,this.height/2+60);
                }else{

                p5.angleMode(p5.DEGREES); // Change the mode to DEGREES
                let a = p5.atan2(p5.mouseY - this.balY, p5.mouseX - this.balX);//to rotae the ball bank pointer around the static ball but in the direction of mouse cursor
                p5.translate(this.balX, this.balY);
                p5.rotate(a)//rotate according to the calculation above
                .fill(p5.mouseY,50,50)
                .rect(55, -4, 100, 8);//all above rotates this rectangle...pointer of the ball bank
                }
            };
            mouseClicked = (p5) =>{
               if(this.youlose || this.youwin){//if any victory or lost sign is showing ...remove them
                    this.youlose = false;
                   this.initial = true;//restart game by resting all the variable 
                       
               }else{
                this.mball.val = this.bans; //value of the moving ball
                this.mball.X = this.balX;
                this.mball.Y = this.balY;
                this.rise=0;
                this.run=0;
                this.rise = (p5.mouseY-this.balY)/10;//direction of the ball calculated in the mouse direction
                this.run  = (p5.mouseX-this.balX)/10; 
                let prev = this.bans;
                do {
                   this.bans = p5.random(this.anw); 
                } while (this.bans === prev);   //avoid to repeat previous answer
                
               }
            }
        render(){
            return <Sketch 
            setup={this.setup} 
            draw={this.draw} 
            mouseClicked={this.mouseClicked.bind(this)}
            />;
        }
        
    
}

export default Game1;