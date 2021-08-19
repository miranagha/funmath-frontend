import React from "react";
import Sketch from "react-p5";


// Fish coordinates
let fish_x;
let fish_y;
// speed of the fish
let speed = 5;

let new_question = false;
//oprator in the question
let op;
// question json body with two numbers and oprator between them
let question = {
    n1: 0,
    n2: 0,
    op: 0
}
//options array
let options = []
let answer = true // if previous answer is true
let correct_option; // the correct option 
let correct  // if the answer is correct
let score = 0
let start = true

export default (props) => {


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(window.innerWidth * 0.6, window.innerHeight * 0.75).parent(canvasParentRef)

    };

    const draw = (p5) => {

        if (start) {
            setupstart(p5)  //runs only first time
        }
        p5.background(255, 241, 208);

        myfish(p5)
        keyTyped(p5)
        walls(p5)

        questions_and_answers(p5);
        retry(p5)

    };


    const setupstart = (p5) => {

        // fish position in the cordinates
        fish_x = window.innerWidth * 0.6 / 2;
        fish_y = window.innerHeight * 0.75;

        // picks the question randomly
        question.n1 = p5.floor(p5.random(26, 50))
        question.n2 = p5.floor(p5.random(1, 25))
        question.op = p5.floor(p5.random(1, 3))

        if (question.op == 1)  // get the oprator +ve or -ve
            op = '+'
        else
            op = '-'

        // calculate the right answer
        correct_option = question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2
        correct = p5.floor(p5.random(1, 5))

        //        push the opions in the array 
        for (let i = 1; i <= 4; i++) {
            if (i === 1) {
                options.push({
                    'x_cord': 350,
                    'y_cord': window.innerHeight * 0.75 / 4,
                    'number': correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                })
            }
            else if (i === 2) {
                options.push({
                    'x_cord': (window.innerWidth * 0.6 / 4),
                    'y_cord': window.innerHeight * 0.75 / 1.8,
                    'number': correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                })
            } else if (i === 3) {
                options.push({
                    'x_cord': (window.innerWidth * 0.6 / 2) + 60,
                    'y_cord': window.innerHeight * 0.75 / 4,
                    'number': correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                })
            } else if (i === 4) {
                options.push({
                    'x_cord': (window.innerWidth * 0.6 / 2) + window.innerWidth * 0.6 / 3,
                    'y_cord': window.innerHeight * 0.75 / 1.8,
                    'number': correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                })
            }
        }
        start = false
    }

    const retry = (p5) => {

        //get mouse position
        let mouse_x;
        let mouse_y;
        if (p5.mouseIsPressed == true) {
            mouse_x = p5.mouseX;
            mouse_y = p5.mouseY;
        }

        // if pressed retry or play again
        if (new_question || !answer && mouse_x >= window.innerWidth * 0.6 / 4 && mouse_x <= window.innerWidth * 0.6 / 4 + 80
            && mouse_y > window.innerHeight * 0.75 / 1.2 && window.innerHeight * 0.75 / 1.2 + 20) {

            // assign the new question
            question.n1 = p5.floor(p5.random(26, 50))
            question.n2 = p5.floor(p5.random(1, 25))
            question.op = p5.floor(p5.random(1, 3))
            if (question.op == 1)
                op = '+'
            else
                op = '-'

            // get the right answer
            correct_option = question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2
            correct = p5.floor(p5.random(0, 3))


            // assign new options to the options array
            for (let i = 0; i <= 3; i++) {
                if (i === 0) {
                    options[i].x_cord = 350
                    options[i].Y_cord = window.innerHeight * 0.75 / 4
                    options[i].number = correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                }

                else if (i === 1) {

                    options[i].x_cord = (window.innerWidth * 0.6 / 4)
                    options[i].y_cord = window.innerHeight * 0.75 / 1.8
                    options[i].number = correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))

                } else if (i === 2) {

                    options[i].x_cord = (window.innerWidth * 0.6 / 2) + 60
                    options[i].y_cord = window.innerHeight * 0.75 / 4
                    options[i].number = correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))

                } else if (i === 3) {

                    options[i].x_cord = (window.innerWidth * 0.6 / 2) + window.innerWidth * 0.6 / 3
                    options[i].y_cord = window.innerHeight * 0.75 / 1.8
                    options[i].number = correct === i ? (question.op === 1 ? question.n1 + question.n2 : question.n1 - question.n2) : p5.floor(p5.random(1, 100))
                }
            }

            //setting the fish position
            fish_x = window.innerWidth * 0.6 / 2;
            fish_y = window.innerHeight * 0.75;
            if (!answer) // check if answer is wrong
                score = 0

            answer = true
            new_question = false
        }



    }

    const questions_and_answers = (p5) => {
        p5.textSize(26);
        p5.fill(0, 102, 153);

        // display the question
        p5.textAlign(p5.CENTER, p5.CENTER);
        
   p5 .textFont('Cursive')
        p5.text('Task :: Let the Funkie get the missing part', (window.innerWidth * 0.6) / 2, 30);
        p5.text(question.n1 + ' ' + op + ' ' + question.n2 + ' =  ___', (window.innerWidth * 0.6) / 2, 60);



        // display the score
        p5.fill('#C22A85');
        p5.textAlign(p5.RIGHT, p5.TOP);
        p5.text('Score : ' + score + '   ', (window.innerWidth * 0.6), 20);


        // display the opions
        options.forEach(element => {
            p5.textSize(26);
            p5.fill('#27AE60');
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(element.number, element.x_cord, element.y_cord)
        });


        options.forEach(element => {
            if (fish_x > element.x_cord - 25 && fish_x < element.x_cord + 30 && fish_y > element.y_cord + 30 && fish_y < element.y_cord + 60) {

                // if fish gets the right option
                if (element.number === correct_option) {
                    const index = options.indexOf(element);
                    if (index > -1) {


                        score++;
                        new_question = true
                    }
                }
                else { // if get the wrong options
                    answer = false
                }


            }
        });



        //    if(new_question){   
        //     question.n1=p5.floor(p5.random(1,50))
        //     question.n2=p5.floor(p5.random(1,50))
        //     question.op=p5.floor(p5.random(1,3))
        //     if(question.op==1)
        //     op='+'
        //     else
        //     op='-'
        //        new_question=false
        //    }

    }


    const walls = (p5) => {

        // Display the walls 
        p5.fill('#870000')
        p5.rect(0, 0, window.innerWidth * 0.6, 10)
        p5.rect(0, 0, 10, window.innerHeight * 0.75)
        p5.rect(0, window.innerHeight * 0.75 - 10, window.innerWidth * 0.6, 10)
        p5.rect(window.innerWidth * 0.6 - 10, 0, 10, window.innerHeight * 0.75);
        p5.rect((window.innerWidth * 0.6) / 2, 120, 10, window.innerHeight * 0.75 - 240)
        p5.rect((window.innerWidth * 0.6 / 2 * 0.3) - 10, window.innerHeight * 0.75 / 3, window.innerWidth * 0.6 / 4, 10)
        p5.rect((window.innerWidth * 0.6 / 2 * 0.3) * 4 + 10, window.innerHeight * 0.75 / 3, window.innerWidth * 0.6 / 4, 10)
        p5.rect((window.innerWidth * 0.6 / 2 * 0.3) - 10, (window.innerHeight * 0.75 / 3) * 2, window.innerWidth * 0.6 / 4, 10)
        p5.rect((window.innerWidth * 0.6 / 2 * 0.3) * 4 + 10, (window.innerHeight * 0.75 / 3) * 2, window.innerWidth * 0.6 / 4, 10)
    }


    const myfish = (p5) => {

        // Sketch the Fish
        p5.noStroke()
        p5.fill('#FF4A1D')
        p5.circle(fish_x, fish_y - 50, 50, 50)

        p5.fill('#fff')
        p5.ellipse(fish_x - 10, fish_y - 58, 13, 16)
        p5.ellipse(fish_x + 10, fish_y - 58, 13, 16)

        p5.fill('#000')
        p5.ellipse(fish_x - 10, fish_y - 58, 6, 6)
        p5.ellipse(fish_x + 10, fish_y - 58, 6, 6)

        p5.fill('#fff')
        p5.ellipse(fish_x, fish_y - 38, 9, 9)

    }
    const keyTyped = (p5) => {

        //Get the key typed
        if (answer) {
            if (p5.keyIsDown(p5.LEFT_ARROW) && fish_x > 35) {



                // Check if there's wall between
                if (fish_x >= (window.innerWidth * 0.6) / 2 && fish_x <= (window.innerWidth * 0.6) / 2 + 40
                    && (fish_y > 150 && fish_y < 190 + window.innerHeight * 0.75 - 240)
                    ||
                    (fish_x >= (window.innerWidth * 0.6 / 2 * 0.3) - 10 && fish_x <= (window.innerWidth * 0.6 / 2 * 0.3) + 18 + window.innerWidth * 0.6 / 4
                        || fish_x >= ((window.innerWidth * 0.6 / 2 * 0.3) * 4) && fish_x <= ((window.innerWidth * 0.6 / 2 * 0.3) * 4) + 45 + window.innerWidth * 0.6 / 4
                    )

                    && ((fish_y >= (window.innerHeight * 0.75) / 3 + 35 && fish_y < (window.innerHeight * 0.75) / 3 + 80)
                        || (fish_y >= (2 * ((window.innerHeight * 0.75) / 3) + 35) && fish_y < (2 * ((window.innerHeight * 0.75) / 3) + 80))

                    )
                ) {

                }
                else
                    fish_x -= speed;
            }

            // Check if there's wall between
            else if (p5.keyIsDown(p5.RIGHT_ARROW) && fish_x < window.innerWidth * 0.6 - 35) {
                if ((fish_x >= (window.innerWidth * 0.6) / 2 - 30 && fish_x <= (window.innerWidth * 0.6) / 2 + 35
                    && (fish_y > 150 && fish_y < 190 + window.innerHeight * 0.75 - 240))
                    ||
                    (fish_x >= (window.innerWidth * 0.6 / 2 * 0.3) - 43 && fish_x <= (window.innerWidth * 0.6 / 2 * 0.3) - 20 + window.innerWidth * 0.6 / 4
                        || fish_x >= (((window.innerWidth * 0.6 / 2 * 0.3) * 4) - 30) && fish_x <= ((window.innerWidth * 0.6 / 2 * 0.3) * 4) + 34 + window.innerWidth * 0.6 / 4
                    )

                    && ((fish_y >= (window.innerHeight * 0.75) / 3 + 35 && fish_y < (window.innerHeight * 0.75) / 3 + 80)
                        || (fish_y >= (2 * ((window.innerHeight * 0.75) / 3) + 35) && fish_y < (2 * ((window.innerHeight * 0.75) / 3) + 80))

                    )
                ) {

                }
                else
                    fish_x += speed;
            }

            // Check if there's wall between
            else if (p5.keyIsDown(p5.DOWN_ARROW) && fish_y < window.innerHeight * 0.75 + 15) {
                if ((fish_x >= (window.innerWidth * 0.6) / 2 - 25 && fish_x <= (window.innerWidth * 0.6) / 2 + 35
                    && (fish_y > 145 && fish_y < 190 + window.innerHeight * 0.75 - 240))
                    ||
                    (fish_x >= (window.innerWidth * 0.6 / 2 * 0.3) - 38 && fish_x <= (window.innerWidth * 0.6 / 2 * 0.3) + 10 + window.innerWidth * 0.6 / 4
                        || fish_x >= (((window.innerWidth * 0.6 / 2 * 0.3) * 4) - 20) && fish_x <= ((window.innerWidth * 0.6 / 2 * 0.3) * 4) + 34 + window.innerWidth * 0.6 / 4
                    )

                    && ((fish_y >= (window.innerHeight * 0.75) / 3 + 25 && fish_y < (window.innerHeight * 0.75) / 3 + 70)
                        || (fish_y >= (2 * ((window.innerHeight * 0.75) / 3) + 25) && fish_y < (2 * ((window.innerHeight * 0.75) / 3) + 70))

                    )
                ) { }
                else
                    fish_y += speed;
            }

            // Check if there's wall between
            else if (p5.keyIsDown(p5.UP_ARROW) && fish_y > 85) {
                if ((fish_x >= (window.innerWidth * 0.6) / 2 - 25 && fish_x <= (window.innerWidth * 0.6) / 2 + 35
                    && (fish_y > 130 && fish_y < 200 + window.innerHeight * 0.75 - 240))
                    ||
                    (fish_x >= (window.innerWidth * 0.6 / 2 * 0.3) - 38 && fish_x <= (window.innerWidth * 0.6 / 2 * 0.3) + 10 + window.innerWidth * 0.6 / 4
                        || fish_x >= (((window.innerWidth * 0.6 / 2 * 0.3) * 4) - 20) && fish_x <= ((window.innerWidth * 0.6 / 2 * 0.3) * 4) + 34 + window.innerWidth * 0.6 / 4
                    )

                    && ((fish_y >= (window.innerHeight * 0.75) / 3 + 25 && fish_y < (window.innerHeight * 0.75) / 3 + 90)
                        || (fish_y >= (2 * ((window.innerHeight * 0.75) / 3) + 25) && fish_y < (2 * ((window.innerHeight * 0.75) / 3) + 90))

                    )
                ) { }
                else
                    fish_y -= speed;
            }
        }
        else {
            //Display the wrong answer message
            p5.textSize(26);
            p5.fill('#E74C3C')

            p5.textAlign(p5.RIGHT, p5.TOP);
            
   p5 .textFont('Cursive')
            p5.text('Wrong answer ✘', window.innerWidth * 0.6 / 2 + window.innerWidth * 0.6 / 3, window.innerHeight * 0.75 / 1.2)

            p5.textAlign(p5.LEFT, p5.TOP);
            
   p5 .textFont('Cursive')
            p5.text('Retry ↻', window.innerWidth * 0.6 / 4, window.innerHeight * 0.75 / 1.2)
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