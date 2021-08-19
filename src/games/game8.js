import { getQueriesForElement } from "@testing-library/react";
import React from "react";
import Sketch from "react-p5";

// Coordinates from where the snake starts
let x_start = 200;
let y_start = 200;
// x and y cordinates array of the beads of snake 
let x_cord = [];
let y_cord = [];
// total beads of snake
let beats = 100;
// Direction of snake 
//  1==>right
// 2==> upwards
// 3==>left
// 4==>Down
let direction = 1;
let speed = 1;  //speed of snake
let changedirection = false;  // for changing the direction
let previous_direction = 2;
let collide = false;   //if snake collides with the outer walls
let food = [] // food array 
let answer = true
let answers_remainig = true
let start = true


export default (props) => {


  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth * 0.6, window.innerHeight * 0.75).parent(canvasParentRef)


  };

  const draw = (p5) => {


    if (start) {
      setupstart(p5)   ///Runs only first time
    }

    p5.background(255, 241, 208);


    update_snake(p5);  //moves the snake 
    update_direction(p5);   // updates the direction if changed
    check_collider();    //checks if snakes collide
    questions_and_answers(p5);   //dispaly the questions ans answrs


    getMouseClick(p5) /// get the mouse click on the retry


  };

  const setupstart = (p5) => {



// First times push the food array with cordinates and the number 
    for (let i = beats; i > 0; i--) {
      if (i == 1)
        x_cord.push(x_start + 10)
      else
        x_cord.push(x_start - i);
      y_cord.push(y_start)

    }


    for (let i = 0; i < 10; i++) {
      food.push({
        'x_cord': p5.floor(p5.random(10, (window.innerWidth * 0.6) / 10)) * 10,
        'y_cord': p5.floor(p5.random(10, (window.innerHeight * 0.75) / 10)) * 10,
        'number': p5.floor(p5.random(10, 99)),
      })

    }
    start = false
  }


  const check_collider = () => {
    let snake_head_x = x_cord[beats - 1];
    let snake_head_y = y_cord[beats - 1];

//// Check if the snake collide with the canvas walls
    if (snake_head_x < 0 || snake_head_x > window.innerWidth * 0.60 || snake_head_y < 0 || snake_head_y > window.innerHeight * 0.75) {
      collide = true
    }


    food.forEach(element => {
      // Checks if the snake head collide with any food in array
      if ((snake_head_x > element.x_cord - 15 && snake_head_x < element.x_cord + 15) && (snake_head_y > element.y_cord - 15 && snake_head_y < element.y_cord + 15)) {


        // logic to get the minimum number
        let min = 100;
        food.forEach(xelement => {
          if (min > xelement.number)
            min = xelement.number
        });
        // check if the snake get the right answer food
        if (element.number != min)
          answer = false
        else {

          // const index = food.indexOf(element);
          // if (index > -1) {
          //   food.splice(index, 1);
          // }
          // answers_remainig=false;

          // if the answer is right moves the food into the thirs axis tha will not be displayed on the screen
          // and appears as the snake eated it 
          element.x_cord = -11
          element.y_cord = -11
          element.number = 111;
          answers_remainig = false;
        }
      } else {

      }
    });





  }

  const questions_and_answers = (p5) => {
    // Display the questions 
    p5.textSize(26);
    p5.fill(0, 102, 153);
    p5.textAlign(p5.CENTER, p5.TOP);
    
   p5 .textFont('Cursive')
    p5.text('Task :: Let the snake eat the numbers in\n Ascending order ', (window.innerWidth * 0.6) / 2, 10);

    // display all the numbers on the food present in the array 
    for (let i = 0; i < food.length; i++) {
      p5.fill(255, 128, 0);
      p5.circle(food[i].x_cord, food[i].y_cord, 30, 30);
      p5.textSize(20);
      p5.fill(0, 102, 153)

      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(food[i].number, food[i].x_cord, food[i].y_cord)

    }


    food.forEach(element => {
      // check if the answer is remaining
      if (element.number < 100)
        answers_remainig = true
    });

  }

  const update_snake = (p5) => {
    //p5.noStroke();        
    /// Updates the snake position 
    p5.fill(157, 0, 0);
    for (let index = 0; index < beats; index++) {
      p5.circle(x_cord[index], y_cord[index], 10, 10);
    }
  }
  const update_direction = (p5) => {
 
    // if the snake present in the canvas and there's answer present there
    if (!collide && answer && answers_remainig) {
      switch (direction) {

        // case 1 is the direcion in the right
        case 1:
          {
            if (changedirection) { // if direction is changed from previous direction
              x_cord[beats - 1] += 10;
              if (previous_direction == 2) // if previous direction is positive y axis
                y_cord[beats - 1] += 10;
              else                        // if previous Direction is negative y axis
                y_cord[beats - 1] -= 10;

              changedirection = false;
              previous_direction = 1;
            }
            for (let index = 0; index < beats; index++) {
              if (index == beats - 1) {

                x_cord[beats - 1] += speed; // every snake bead get the position of its warly bead
              }
              else if (index == beats - 2) {

                x_cord[index] = x_cord[index + 1] - 10;  // the head space of snake
                y_cord[index] = y_cord[index + 1];

              }

              else {
                x_cord[index] = x_cord[index + 1]; // every snake bead get the position of its early bead
                y_cord[index] = y_cord[index + 1];

              }

            }



            changedirection = false;
          }
          break;

 // case 2 is the direcion in the upwards
        case 2:

          if (changedirection) {// if direction is changed from previous direction
            y_cord[beats - 1] -= 10;
            if (previous_direction == 3)// if previous direction is negative x axis
              x_cord[beats - 1] += 10;
            else
              x_cord[beats - 1] -= 10;//if previous direction is positive x axis

            changedirection = false
            previous_direction = 2;
          }

          for (let index = 0; index < beats; index++) {
            if (index == beats - 1) {

              y_cord[beats - 1] -= speed;

            }
            else if (index + 1 == beats - 1) {

              x_cord[index] = x_cord[index + 1];
              y_cord[index] = y_cord[index + 1] + 10;

            }

            else {
              x_cord[index] = x_cord[index + 1];
              y_cord[index] = y_cord[index + 1];

            }

          }


          changedirection = false;


          break;

           // case 3 is the direcion in the left
        case 3:



          if (changedirection) {// if direction is changed from previous direction
            x_cord[beats - 1] -= 10;
            if (previous_direction == 2)// if previous direction is posiive y axis
              y_cord[beats - 1] += 10;
            else                //if previous direction is negative y axis
              y_cord[beats - 1] -= 10;

            changedirection = false;
            previous_direction = 3;
          }
          for (let index = 0; index < beats; index++) {
            if (index == beats - 1) {

              x_cord[beats - 1] -= speed;
            }
            else if (index == beats - 2) {

              x_cord[index] = x_cord[index + 1] + 10;
              y_cord[index] = y_cord[index + 1];

            }

            else {
              x_cord[index] = x_cord[index + 1];
              y_cord[index] = y_cord[index + 1];

            }

          }

          changedirection = false;
          break;

           // case 4 is the direcion in the downwards
        case 4:
          if (changedirection) {// if direction is changed from previous direction
            y_cord[beats - 1] += 10;

            if (previous_direction == 3)// if previous direction is negative x axis
              x_cord[beats - 1] += 10;
            else                        // if previous direction is posiive x axis
              x_cord[beats - 1] -= 10;

            changedirection = false
            previous_direction = 4;
          }

          for (let index = 0; index < beats; index++) {
            if (index == beats - 1) {

              y_cord[beats - 1] += speed;

            }
            else if (index + 1 == beats - 1) {

              x_cord[index] = x_cord[index + 1];
              y_cord[index] = y_cord[index + 1] - 10;

            }

            else {
              x_cord[index] = x_cord[index + 1];
              y_cord[index] = y_cord[index + 1];

            }

          }


          changedirection = false;
          break;



        default:
          break;
      }
    }

    // if collided with canvas walls print message
    else if (collide) {
      p5.textSize(26);
      p5.textAlign(p5.CENTER, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Oops, Try again', window.innerWidth * 0.6 / 2, 70)
      p5.textAlign(p5.LEFT, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Retry ↻', 20, 20)
    }
    
    // if get the wrong answer
    else if (!answer) {
      p5.textSize(26);

      p5.textAlign(p5.CENTER, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Wrong answer ✘', window.innerWidth * 0.6 / 2, 70)
      p5.textAlign(p5.LEFT, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('Retry ↻', 20, 20)
    }

    // if no answer remains
    else if (!answers_remainig) {
      p5.textSize(26);
      p5.fill(0, 153, 0);

      p5.textAlign(p5.CENTER, p5.TOP);
      
   p5 .textFont('Cursive')
      p5.text('You Won ✓', window.innerWidth * 0.6 / 2, 70)
    }
  }

  const getMouseClick = (p5) => {
    let mouse_x;
    let mouse_y;
    //  get the mouse axis
    if (p5.mouseIsPressed == true) {
      mouse_x = p5.mouseX;
      mouse_y = p5.mouseY;
    }

    // if pressed on retry or play again
    if ((!answer || collide) && mouse_x > 20 && mouse_y > 20 && mouse_x < 100 && mouse_y < 40) {
      for (let i = 0; i < 10; i++) {

        food[i].x_cord = p5.floor(p5.random(10, (window.innerWidth * 0.6) / 10)) * 10
        food[i].y_cord = p5.floor(p5.random(10, (window.innerHeight * 0.75) / 10)) * 10
        food[i].number = p5.floor(p5.random(10, 99))


      }
      collide = false
      answer = true


      //reset the original direction and position
      x_start = 200;
      y_start = 200;
      direction = 1
      for (let i = beats; i > 0; i--) {
        if (i == 1)
          x_cord[i] = (x_start + 10)
        else
          x_cord[i] = (x_start - i);
        y_cord[i] = (y_start)

      }
    }


  }

  const keyPressed = (p5) => {

    // check which key is pressed
    if (p5.keyCode === p5.LEFT_ARROW) {
      if (direction !== 1 && direction !== 3) {
        direction = 3;
        changedirection = true;
      }
    } else if (p5.keyCode === p5.RIGHT_ARROW) {
      if (direction !== 3 && direction !== 1) {
        direction = 1;

        changedirection = true;
      }
    }
    else if (p5.keyCode === p5.UP_ARROW) {
      if (direction !== 4 && direction !== 2) {
        direction = 2;

        changedirection = true;
      }

    }
    else if (p5.keyCode === p5.DOWN_ARROW) {
      if (direction !== 2 && direction !== 4) {
        direction = 4;

        changedirection = true;
      }
    }
  }

  return <Sketch setup={setup}
    draw={draw}
    keyPressed={keyPressed}
    style={
      {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#FFF1D0',
      }
    }
  />;
};