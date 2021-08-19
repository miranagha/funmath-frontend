import { getQueriesForElement } from "@testing-library/react";
import { Dropdown } from "bootstrap";
import React from "react";
import Sketch from "react-p5";




let start = true;   // only true when game runs first time
let restart = false;  // for retry in case of wrong answer
let playagain = false;  // for play again in case in winning
let balls = []   // total number of balls or apple array
let answer = true   // if answer is true... false if answr is wrong 
let answer_remaining = true // true if answer is remaining
let tap = false  //true when we tap and hold the ball
let moving_ball  // true when moves the ball

let radius = 32   //radius of baseket hoop
// hoop coordinates
let hoopX = 100    
let hoopY = 150
let score=0

export default (props) => {


  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth * 0.6, window.innerHeight * 0.75).parent(canvasParentRef)


  };

  const draw = (p5) => {

    p5.background(255, 241, 208);  // background canvas color
    
    // execute when game runs first time
    if (start) {
      startSetup(p5)
    }
    
    // execute when  retry or playagain
    
    if (restart) {
      restartSetup(p5)
    }


    showBalls(p5)          // display all the balls or apples
    getmousetap(p5)        // get the mouse click and pick the apple
    dropball(p5)            // drop he apples
    questionandanswer(p5)    //display the questions and their answers
    hoop(p5)                  // display the baskets
  };

  const hoop = (p5) => {



    //Set the coodinates of the two baskets on right and left end
    for (let index = 0; index < 2; index++) {

      if (index === 0) {
            //Left end
        hoopX = 60
        hoopY = window.innerHeight * 0.75 - 100
      }
      else {
          //Right end
        hoopX = window.innerWidth * 0.60 - 60
        hoopY = window.innerHeight * 0.75 - 100
      }

        // design the Basket 

      p5.noFill()
      p5.stroke(0);
      p5.strokeWeight(4);
      p5.stroke(255, 140, 0);
      p5.ellipse(hoopX, hoopY, radius * 3, radius / 2)
      p5.stroke(0)
      p5.fill(0, 0, 0)
      // p5.quad(hoopX - radius*3/2 - radius/5, hoopY-radius/5, hoopX - radius*3/2 + radius*0.75 - radius/5, hoopY + radius/5, hoopX - radius*3/2 + radius*0.75 - radius/5, hoopY - radius*3 + radius/5, hoopX - radius*3/2 - radius/5, hoopY - radius*3 - radius/5)
      ///  p5. line(hoopX - radius*3/2 + radius/10, hoopY, hoopX - radius*3/2 + radius/10,y_start+radius)
      //rect(hoopX + radius*3/2,hoopY-radius*3, radius*0.75, radius*3)
      p5.noFill()
      //circle(440,100,5)
      p5.stroke(255)
      // line(440,100, 540,200)
      // line(560, 100, 460, 200)
      p5.stroke(0)

      p5.strokeWeight(1);

      p5.stroke(100)
      p5.strokeWeight(4);
      p5.line(hoopX - radius * 3 / 2, hoopY, hoopX - radius, hoopY + 3 * radius)
      p5.line(hoopX + radius, hoopY + 3 * radius, hoopX + radius * 3 / 2, hoopY)
      p5.line(hoopX + radius * 3 / 2, hoopY, (hoopX - radius * 3 / 2 + hoopX - radius) / 2, hoopY + radius * 3 / 2)
      p5.line(hoopX - radius * 3 / 2, hoopY, (hoopX + radius * 3 / 2 + hoopX + radius) / 2, hoopY + radius * 3 / 2)
      p5.line((hoopX - radius * 3 / 2 + hoopX - radius) / 2, hoopY + radius * 3 / 2, hoopX + radius, hoopY + 3 * radius)
      p5.line((hoopX + radius * 3 / 2 + hoopX + radius) / 2, hoopY + radius * 3 / 2, hoopX - radius, hoopY + 3 * radius)
      p5.stroke(0)
      p5.strokeWeight(1)
    }

  }


  const questionandanswer = (p5) => {


    //display the questions
    p5.textSize(26);
    p5.fill(0, 102, 153);
    p5.textAlign(p5.CENTER, p5.CENTER);
    
   p5 .textFont('Cursive')
    p5.text('Task :: Pick and Throw the apple in \nright basket', (window.innerWidth * 0.6) / 2, 40);



    // check if thre's any apple on the screen
    balls.forEach(element => {
      if (element.x_cord > 0 && element.y_cord > 0 && answer) {
        answer_remaining = true
      }
    });


    // if there's no apple on the screen and will display the win message
    if (!answer_remaining) {
      p5.textSize(26);
      p5.fill(0, 153, 0);
      
   p5 .textFont('Cursive')
      p5.text('You Won ✓', window.innerWidth * 0.6 / 2, 80)
      p5.textAlign(p5.LEFT, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Play again ↻', 20, 20)
      playagain = true
    }
  }




  const dropball = (p5) => {



    balls.forEach(element => {

      // check if the apple dropes in he left basket with their coordinates
      if (element.x_cord > 0 && element.x_cord < 120 && element.y_cord > window.innerHeight * 0.75 - 120 && element.y_cord < window.innerHeight * 0.75) {
        {
          element.x_cord = -200;
          element.y_cord = -200;

          //check if the answer is true
          if (element.number > 5)
            answer = false
          else {
            
            //increase the score
            score++

            answer_remaining = false
          }

        }
      }


      // check if the apple dropes in the right basket with their coordinates
      else if (element.x_cord > window.innerWidth * 0.60 - 120 && element.x_cord < window.innerWidth * 0.60 && element.y_cord > window.innerHeight * 0.75 - 120 && element.y_cord < window.innerHeight * 0.75) {
        {
          element.x_cord = -200;
          element.y_cord = -200;
          
          //check if the answer is true
          if (element.number < 5)
            answer = false
          else {
            //increase the score
            score++;
            answer_remaining = false
          }

        }
      }
    });


  }
  const getmousetap = (p5) => {

    let mouse_x;
    let mouse_y;
    //get the mouse tap and their x and y cordinates
    if (p5.mouseIsPressed == true) {
      mouse_x = p5.mouseX;
      mouse_y = p5.mouseY;
    }

    // Check if the  previos answer is true 
    if (answer && !playagain) {
     

      //check all the apples which apples is tappes from their coordinates
      balls.forEach(element => {
        if (!tap && mouse_x > element.x_cord - 25 && mouse_x < element.x_cord + 25 && mouse_y > element.y_cord - 25 && mouse_y < element.y_cord + 25) {



          const index = balls.indexOf(element);
       //   if tapped get the index of apple a
          if (index > -1) {
            moving_ball = index
          }
          tap = true
        }
      });
    }

    // check if play again or retry is pressed from their coordinates
    else if ((playagain || !answer) && mouse_x > 20 && mouse_x < 120
      && mouse_y > 20 && mouse_y < 40) {
      restart = true
      answer = true
      playagain = false
      score = 0
    }

    // check if previous answer is wrong then display wrong answer message
    else if (!answer) {
      p5.fill(157, 0, 0);
      p5.textAlign(p5.CENTER, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Wrong answer ✘', window.innerWidth * 0.6 / 2, 75)
      p5.textAlign(p5.LEFT, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Retry ↻', 20, 20)
    }
  }

  const showBalls = (p5) => {

    p5.fill('#000')
    // p5.circle(0,(window.innerHeight*0.75),300,300)
    // p5.circle((window.innerWidth*0.6),(window.innerHeight*0.75/1),300 ,300)
 
      // Draw all the apples
    balls.forEach(element => {
      p5.fill('#ADC5' + element.color + '1'
      )
      drawApple(p5, element.x_cord, element.y_cord)
    });

    p5.fill('#555')
    p5.text('< 5', 60, window.innerHeight * 0.75 - 130)
    p5.text('> 5', window.innerWidth * 0.60 - 60, window.innerHeight * 0.75 - 130)


    // Draw all the numbers on the apples
    balls.forEach(element => {
      p5.fill('#fff')
      p5.text(element.number, element.x_cord, element.y_cord)
    });


  }

  function drawApple(p5, x, y) {

    // The apples Sketch
    p5.noStroke();
    p5.push();
    p5.translate(x, y);
    p5.fill(204, 55, 51);
    p5.ellipseMode(p5.CENTER);
    p5.ellipse(0, 0, 60, 55);
    p5.stroke(78, 38, 0);
    p5.strokeWeight(5);
    p5.line(-5, -45, 0, -25);
    p5.noStroke();
    p5.rotate(p5.radians(-30));
    p5.fill(39, 166, 21);
    p5.ellipse(7, -33, 15, 25)
    p5.pop();
  }

  const restartSetup = (p5) => {

    // When play again or retry is pressed
    let j = 0
    for (let i = 0; i < 9; i++) {

      if (i == 5) {
        j++;
      }
      //all the apples get the cordinates and and their numbers in array
      balls[i].x_cord = window.innerWidth * 0.6 - (60 * (j + 1))//:window.innerWidth*0.6/2+100,
      balls[i].y_cord = i % 2 == 0 ? window.innerHeight * 0.75 / 2 - 100 : window.innerHeight * 0.75 / 2
      balls[i].color = p5.floor(p5.random(1, 5))
      balls[i].number = j



      j++;

    }
    restart = false
  }
  const startSetup = (p5) => {

    // Executes only first time to push the array with new numbers and coordinates
    for (let i = 0; i < 10; i++) {

      if (i == 5) {

      } else {
        balls.push({

          'x_cord': window.innerWidth * 0.6 - (60 * (i + 1)),//:window.innerWidth*0.6/2+100,
          'y_cord': i % 2 == 0 ? window.innerHeight * 0.75 / 2 - 100 : window.innerHeight * 0.75 / 2,
          'color': p5.floor(p5.random(1, 5)),
          'number': i

        })
      }

    }
    start = false
  }

  const mouseDragged = (p5) => {
    let mouse_x = p5.mouseX;
    let mouse_y = p5.mouseY;

    // when is mouse is moving and is grabbing the apple
    if (answer) {
      balls.forEach(element => {
        const index = balls.indexOf(element);
        if (index > -1) {
          if (tap && index === moving_ball) {
            //is taped the ball assign the mouse cordinates to the apple
            element.x_cord = mouse_x;
            element.y_cord = mouse_y
          }

        }


      });
    }

    return false;
  }


  const mouseReleased = () => {
    // when mouse is released
    tap = false
  }


  return <Sketch setup={setup}
    draw={draw}
    mouseDragged={mouseDragged}
    mouseReleased={mouseReleased}


  />;
};