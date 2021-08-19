import { getQueriesForElement } from "@testing-library/react";
import React from "react";
import Sketch from "react-p5";

let shape = []; //shapes array contain multiple shapes
let speed = 1  // speed from which they comes down
let score = 0
let answer = true;  // if previous answer is true
let ques_shape = 1;   // correct answer shape
let change_ques = false  // to change the question
let next_shapes = false;   // setup the next shape
let dropped = false      // if correct shape is dropped
let start = true

export default (props) => {


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(window.innerWidth * 0.6, window.innerHeight * 0.75).parent(canvasParentRef)

    };

    const draw = (p5) => {



        if (start) {
            setupstart(p5)   // runs only first time
        }
        p5.background(255, 241, 208);

        shapes(p5)   // display the shapes 
        getMouseClick(p5)  // get the mouse tap
        questions_and_answers(p5);  //display the shapes

        moveShapes(p5)  // move the shapes
    };


    const setupstart = (p5) => {
        // runs only first time

        // assign the shapes in the shape array with their position coordinates
        for (let i = 1; i <= 3; i++) {
            shape.push({
                'x_cord': i === 1 ? window.innerWidth * 0.1 : i === 2 ? window.innerWidth * 0.3 : window.innerWidth * 0.5,
                'y_cord': 10,
                'shape': p5.floor(p5.random(1, 7))
            })

        }
        //correct answer shape
        ques_shape = p5.floor(p5.random(1, 7))

        //adding the correct shape in the options
        let ans = p5.floor(p5.random(1, 4))
        for (let i = 0; i < 3; i++) {
            if (i === ans - 1)
                shape[i].shape = ques_shape
        }
        start = false

    }
    const questions_and_answers = (p5) => {

        let shape_name;
        // if question is changes or selcted the right answer
        if (change_ques && next_shapes) {
            ques_shape = p5.floor(p5.random(1, 7))
            let ans = p5.floor(p5.random(1, 4))

            //asign shapes to the option
            for (let i = 0; i < 3; i++) {
                if (shape[i]) {
                    if (i === 0)
                        shape[i].x_cord = window.innerWidth * 0.1;
                    else if (i === 1)
                        shape[i].x_cord = window.innerWidth * 0.3;
                    else
                        shape[i].x_cord = window.innerWidth * 0.5;

                    shape[i].y_cord = 10;
                    shape[i].shape = p5.floor(p5.random(1, 7));

                }
                //            adding new option if right answer is tapped and removed
                else {
                    shape.push({
                        'x_cord': i === 0 ? window.innerWidth * 0.1 : i === 1 ? window.innerWidth * 0.3 : window.innerWidth * 0.5,
                        'y_cord': 10,
                        'shape': p5.floor(p5.random(1, 7))
                    })
                }
                if (i === ans - 1)
                    shape[i].shape = ques_shape
            }

            change_ques = false
            next_shapes = true
        }
        // questions shapes with reference to their assign number
        switch (ques_shape) {
            case 1:
                shape_name = 'Triangle'
                break;
            case 2:

                shape_name = 'Half Circle'
                break;
            case 3:

                shape_name = 'Square'
                break;
            case 4:

                shape_name = 'Rectangle'
                break;
            case 5:

                shape_name = 'Circle'
                break;
            case 6:

                shape_name = 'Ellipse'
                break;

            default:
                break;
        }

        p5.noStroke();
        p5.fill(255, 241, 208)
        p5.rect(0, 0, window.innerWidth, 60)

        // Display the question
        p5.textSize(26);
        p5.fill(0, 102, 153);
        p5.textAlign(p5.CENTER, p5.TOP);
        
   p5 .textFont('Cursive')
        p5.text('Task :: Tap the ' + shape_name + ' shape', (window.innerWidth * 0.6) / 2, 20);


        // Display the score
        p5.fill('#C22A85');
        p5.textAlign(p5.RIGHT, p5.TOP);
        
   p5 .textFont('Cursive')
        p5.text('Score : ' + score + '   ', (window.innerWidth * 0.6), 20);


    }

    const moveShapes = (p5) => {

        // if previous answer is true and the shape is not dropped
        if (answer && !dropped) {
            shape.forEach(element => {


                //            moves the y axis of the all shapes 
                element.y_cord += speed
                if (element.y_cord > window.innerHeight) {
                    //if shapes goes in the bottom of the canvas

                    if (ques_shape === element.shape) {
                        //if answer is dropped
                        dropped = true
                        answer = false
                        change_ques = true
                        next_shapes = true
                    }
                    else {
                        // resetting their position 
                        element.y_cord = 0
                        element.shape = p5.floor(p5.random(1, 7))
                        next_shapes = true
                    }
                }

            });

        }
        else if (!answer && dropped == false) {
            // if the answer is wrong :: Display the wrong msg
            p5.textSize(26);
            p5.fill(157, 0, 0);
            p5.textAlign(p5.CENTER, p5.TOP);
            p5.text('Wrong answer ✘', window.innerWidth * 0.6 / 2, 70)
            p5.fill('#C22A85');
            p5.textAlign(p5.LEFT, p5.TOP);
            p5.text('Retry ↻', 20, 20)
        }
        else if (dropped && !answer) {
            // If the right answer shape is dropped ::display the msg
            p5.textSize(26);

            p5.fill(157, 0, 0);
            p5.textAlign(p5.CENTER, p5.TOP);
            
   p5 .textFont('Cursive')
            p5.text('Oops shape dropped ✘', window.innerWidth * 0.6 / 2, 70)
            p5.fill('#C22A85');
            p5.textAlign(p5.LEFT, p5.TOP);
            
   p5 .textFont('Cursive')
            p5.text('Retry ↻', 20, 20)
        }

    }
    const shapes = (p5) => {

        // Sketch each shape and fill seprate color
        p5.fill('#222')

        shape.forEach(elemen => {
            if (elemen.shape === 1) {

                //                ---------------*****  Triangle   ****---------------------
                p5.stroke(1)
                p5.fill('#686DA7')
                p5.triangle(elemen.x_cord, elemen.y_cord, elemen.x_cord + 50, elemen.y_cord + 50, elemen.x_cord, elemen.y_cord + 50)
                // p5.line(elemen.x_cord,elemen.y_cord,elemen.x_cord+50,elemen.y_cord+50);
                // p5.line(elemen.x_cord,elemen.y_cord,elemen.x_cord,elemen.y_cord+50);
                // p5.line(elemen.x_cord,elemen.y_cord+50,elemen.x_cord+50,elemen.y_cord+50);
            }
            else if (elemen.shape === 2) {

                //                ---------------*****  half circle   ****---------------------
                p5.fill('#681346')
                p5.arc(elemen.x_cord, elemen.y_cord + 25, 50, 50, p5.PI, 0, p5.CHORD);
            }
            else if (elemen.shape === 3) {

                //                ---------------*****  square   ****---------------------
                p5.fill('#4633FF')
                p5.rect(elemen.x_cord, elemen.y_cord, 50, 50);
            }
            else if (elemen.shape === 4) {

                //                ---------------*****  rectangle   ****---------------------
                p5.fill('#FF5733')
                p5.rect(elemen.x_cord, elemen.y_cord, 80, 50);
            } else if (elemen.shape === 5) {
                //                ---------------*****  circle   ****---------------------
                p5.fill('#33FF36')
                p5.circle(elemen.x_cord, elemen.y_cord + 25, 50, 50);
            } else if (elemen.shape === 6) {
                //                ---------------*****  ellipse   ****---------------------
                p5.fill('#3396FF')
                p5.ellipse(elemen.x_cord, elemen.y_cord + 25, 80, 50);
            }
        });


    }




    const getMouseClick = (p5) => {
        // ge the mouse click position
        let mouse_x;
        let mouse_y;
        if (p5.mouseIsPressed == true) {
            mouse_x = p5.mouseX;
            mouse_y = p5.mouseY;
        }

        if (answer) {
            shape.forEach(element => {
                if (mouse_x > element.x_cord - 25 && mouse_y > element.y_cord - 25) { // if mouse is tapped on the shape 
                    switch (element.shape) {
                        case 1:    // if the shape is triangle
                            if (p5.mouseX < element.x_cord + 50 && p5.mouseY < element.y_cord + 50) {

                                if (ques_shape === element.shape) {// check the ques shape

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);    // remove frrom the display
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;
                        case 2:   /// if the shape is half circle
                            if (p5.mouseX < element.x_cord + 50 && p5.mouseY < element.y_cord + 50) {

                                if (ques_shape === element.shape) {

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;
                        case 3:// if the shape is square
                            if (p5.mouseX < element.x_cord + 50 && p5.mouseY < element.y_cord + 50) {
                                if (ques_shape === element.shape) {

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;
                        case 4:// if the shape is rectangle
                            if (p5.mouseX < element.x_cord + 80 && p5.mouseY < element.y_cord + 50) {

                                if (ques_shape === element.shape) {

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;
                        case 5:// if the shape is circle
                            if (p5.mouseX < element.x_cord + 50 && p5.mouseY < element.y_cord + 50) {

                                if (ques_shape === element.shape) {

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;
                        case 6:// if the shape is ellipse
                            if (p5.mouseX < element.x_cord + 50 && p5.mouseY < element.y_cord + 50) {

                                if (ques_shape === element.shape) {

                                    const index = shape.indexOf(element);
                                    if (index > -1) {
                                        shape.splice(index, 1);
                                    }
                                    score++;
                                    change_ques = true
                                }
                                else {

                                    answer = false
                                }

                            }
                            else {

                            }

                            break;

                        default:
                            break;
                    }

                }
            });
        }

        else if (!answer) {
            // if tapped on retry 
            if (mouse_x > 20 && mouse_y > 20 && mouse_x < 100 && mouse_y < 40) {
                answer = true
                dropped = false
                score = 0
            }
        }

    }


    return <Sketch setup={setup}
        draw={draw}
        style={
            {
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',

            }
        }
    />;
};