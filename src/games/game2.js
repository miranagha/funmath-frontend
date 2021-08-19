import React, { Component } from 'react';
import Sketch from 'react-p5'

class Game2 extends Component {
    width =0;
    height =0;
    initial = true;
    clr = [0,0,0,0];
    ques = [];
    frac =0;
    fracangle =0;
    ra=0;
    rb=0;
    rc=0;
    rd=0;
    roll = false;
    n=1;
    i=0;
    milli = 0;
    shape = "";
    angi =0;
    hit = [];
    scr =0;
    youlose = false;
    youwin = false;
    rolled = false;
    
            setup = (p5, canvasParentRef) => {
                this.width = window.innerWidth*0.6;
                this.height = window.innerHeight*0.75;
                p5.createCanvas(this.width, this.height).parent(canvasParentRef);
            };
        
            draw = (p5) => {
                p5.background(255, 241, 208)
                .fill(0,0,102)
                .textSize(25)
                .textFont('Cursive')
                .text("Task :: Roll the dice and mark the fraction.", 20, 60);
                
                if(this.initial){
                    let hitl = []; //holds the sector click
                    let quesl = []; //holds the questions on dice localy
                    this.clr = [0,0,0,0];
                    this.roll = false;// means if dice is rolling
                    this.rolled = false;//means that dice rolling is completed
                    this.angi=0;
                    this.frac = p5.int(p5.random(5,9)); //calculate the total fraction
                    this.ra = p5.int(p5.random(1,this.frac)); //nominator 1
                    do{
                        this.rb = p5.int(p5.random(1,this.frac));
                    }
                    while(this.rb===this.ra);//nominator 2---repeat if same from any previous
                    do{
                        this.rc = p5.int(p5.random(1,this.frac));
                    }
                    while(this.rc===this.ra || this.rc===this.rb);//nominator of 3rd fraction---repeat if same from any previous
                    do{
                        this.rd = p5.int(p5.random(1,this.frac));
                    }
                    while(this.rd===this.ra || this.rd===this.rb || this.rd===this.rc);//nominator 4th fraction---repeat if same from any previous
                    this.shape = p5.random(["cir","rect"]);

                    quesl.push(this.ra+'/'+this.frac)//add the above calculated fractions in array
                    quesl.push(this.rb+'/'+this.frac)
                    quesl.push(this.rc+'/'+this.frac)
                    quesl.push(this.rd+'/'+this.frac)
                    this.ques = quesl;//copy to global
                    for(let i=0;i<this.frac;i++){
                        hitl.push(false);//
                    }
                    this.hit = hitl;//initializa hit with false
                    this.fracangle = 360/ this.frac; //divide circle into number of fractions
                    this.scr =0;//hold score
                    this.initial = false;
                }
                p5.fill(204,204,this.clr[0])
                .rect((this.width/2)-70,100, 70, 70)//dice 1
                .fill(50,50,255)
                    .textSize(20)
                    .textFont('Helvetica')
                    .text(this.ques[0],(this.width/2)-70+20,100+45)
                .fill(204,204,this.clr[1])
                .rect((this.width/2),100, 70, 70)//dice 2
                .fill(50,50,255)
                    .text(this.ques[1],(this.width/2)+20,100+45)
                .fill(204,204,this.clr[2])
                .rect((this.width/2),100+70, 70, 70)//dice 3
                .fill(50,50,255)
                    .text(this.ques[2],(this.width/2)+20,100+70+45)
                .fill(204,204,this.clr[3])
                .rect((this.width/2)-70,100+70, 70, 70)//dice 4
                .fill(50,50,255)
                    .text(this.ques[3],(this.width/2)-70+20,100+70+45);//show the fraction above the dice
                
                    p5.textSize(22)
                    .textFont('Cursive')
                    .fill(255,128,0)
                    .rect((this.width - this.width/4),115, 150, 50,30)
                    .fill(50,50,255)
                    .text("Roll",(this.width - this.width/4 + 60),150)//rool button area
                    p5.fill(255,128,0)
                    .rect((this.width - this.width/4),180, 150, 50,30)
                    .fill(50,50,255)
                    .text("OK",(this.width - this.width/4) + 60,215)//ok button

                if(this.roll){// if currently is rolling
                    if(p5.millis()>this.milli){
                       this.milli = p5.int(p5.millis())+(2^this.n);  //time after color updates---increase exponentialy each time
                       
                       this.clr[0] = 0;               
                       this.clr[1] = 0;               
                       this.clr[2] = 0;               
                       this.clr[3] = 0;               

                       this.clr[this.i] = 200;  //sets perticular dice color
                       
                       
                       if((2^this.n)>200){//if dice is bieng rolling for sepecific time
                        if(this.i === this.rand){
                            this.roll=false;//stop the rolling
                        }
                       }
                       this.n+=5;
                       this.i++;
                       if(this.i>3)  
                       this.i=0;  
                        }
                    }

                    if(this.youwin){//if player win
                        p5
                    .textSize(30)
                    .fill(0,153,0)
                    .text("You Win !",(this.width/4)-60,150)
                    .text("Play Again ↻",(this.width/4)-80,215);
                    }else if(this.youlose){
                        p5
                    .textSize(30)
                    .fill(255,0,0)
                    .text("You Lose !",(this.width/4)-60,150)
                    .text("Retry ↻",(this.width/4)-40,215);
                    }

                    p5.fill(102,178,255);
                    if(this.shape==="cir"){//if selected shape is circle
                       for(let i=0;i< this.frac;i++){
                        if(this.hit[i])
                        p5.fill(0,0,255);
                        else
                        p5.fill(102,178,255);
                        p5.arc(this.width/2, p5.int(this.height*0.7), 150, 150, p5.radians(this.angi), p5.radians(this.angi+this.fracangle), p5.PIE); 
                        this.angi+=this.fracangle;
                     }
                     }else if(this.shape ==="rect"){// else slected shape in rectangle
                        for(let i=0;i< this.frac;i++){
                            if(this.hit[i])
                            p5.fill(0,0,255);
                            else
                            p5.fill(102,178,255);
                            p5.rect(this.width/2-(this.width*0.6)/2 + i*(this.width*0.6)/this.frac,p5.int(this.height*0.7)-50,(this.width*0.6)/this.frac,100)
                         }
                     }
                     
            };
            isInsideSector(point, center, radius, angle1, angle2) {//check which sector of cirle is clicked
                
                function areClockwise(center, radius, angle, point2) {
                    
                  var point1 = {
                    x : (center.x + radius) * Math.cos(angle),
                    y : (center.y + radius) * Math.sin(angle)
                  };
                  return -point1.x*point2.y + point1.y*point2.x > 0;
                }
              
                var relPoint = {
                  x: point.x - center.x,
                  y: point.y - center.y
                };
              
                return !areClockwise(center, radius, angle1, relPoint) &&
                       areClockwise(center, radius, angle2, relPoint) &&
                       (relPoint.x*relPoint.x + relPoint.y*relPoint.y <= radius * radius);
              }
            mouseClicked = (p5) =>{
                if(this.youlose || this.youwin){//if any wanrnig of win and lose is showing 
                    this.youlose = false;
                    this.youwin = false;
                   this.initial = true;//reset variables
                       
               }else if(p5.mouseX > (this.width - this.width/4) && p5.mouseX < (this.width - this.width/4)+150
                && p5.mouseY > 115 && p5.mouseY < 165){//if mouse is clicked on roll button
                this.roll = true;
                this.rolled = true;
                this.n =1;
                this.milli = p5.millis() + 2^this.n; 
                this.rand = p5.random([0,1,2,3]);
                }else if(p5.mouseX > (this.width - this.width/4) && p5.mouseX < (this.width - this.width/4)+150
                && p5.mouseY > 180 && p5.mouseY < 230){//if mouse is clicked on ok button
                    this.scr=0;
                    for(let i=0;i< this.frac;i++){//check if the highlighted sector are equal to given fraction
                         if(this.hit[i]){
                            this.scr++;
                         }
                       }
                      
                if(this.rand === 0){
                    if(this.ra === this.scr){
                    this.youwin = true
                    this.youlose = false
                    }else{
                    this.youwin = false
                    this.youlose = true
                    }
                }else if(this.rand === 1){
                    if(this.rb === this.scr){
                        this.youwin = true
                        this.youlose = false
                        }else{
                        this.youwin = false
                        this.youlose = true
                        }
                }else if(this.rand === 2){
                    if(this.rc === this.scr){
                        this.youwin = true
                        this.youlose = false
                        }else{
                        this.youwin = false
                        this.youlose = true
                        }
                }else if(this.rand === 3){
                    if(this.rd === this.scr){
                        this.youwin = true
                        this.youlose = false
                        }else{
                        this.youwin = false
                        this.youlose = true
                        }
                } 
                
            }else if(!this.roll && this.rolled){//block or cirle is highlighted only after the dice is completelley rolled
                if(this.shape === "cir"){
                    for(let i=0;i< this.frac;i++){
                        var point = { x: p5.mouseX, y: p5.mouseY };
                         
                        var piecenter = { x: this.width/2, y: p5.int(this.height*0.7) };
                        if(this.isInsideSector(point,piecenter,75,p5.radians(this.angi),p5.radians(this.angi+this.fracangle))){
                            this.hit[i] = !this.hit[i];
                        }
                        this.angi+=this.fracangle;
                     }
                }else if(this.shape === "rect"){
                    for(let i=0;i< this.frac;i++){
                     if(p5.mouseX >= this.width/2-(this.width*0.6)/2 + i*(this.width*0.6)/this.frac && p5.mouseX <= this.width/2-(this.width*0.6)/2 + i*(this.width*0.6)/this.frac + (this.width*0.6)/this.frac
                        && p5.mouseY >= p5.int(this.height*0.7)-50 && p5.mouseY <= p5.int(this.height*0.7)-50 + 100 ){
                         this.hit[i] = !this.hit[i];
                     }
                    }
                }
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

export default Game2;