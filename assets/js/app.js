// Made and Array of Objects with the questions
let questions= [
    {
        question: "1. Who is making the Web Standards?",
        choice: ["Mozilla", "Microsoft",  "The World Wide Web Consortium"],
        answer: 3
    },
    {
        question: "2. What does HTML stand for?",
        choice: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: 1
    },
    {
        question: "3. What is the correct sequence of HTML tags for starting a webpage?",
        choice: ["Head, Title, HTML", "Title, Head, HTML", "HTML, Head, Title"],
        answer: 3
    },
    {
        question: "4. Choose the correct HTML tag for the largest heading.",
        choice: ["H1", "Heading", "Head" ],
        answer: 2
    },
    {
        question: "5. What is the correct HTML tag for inserting a line break?",
        choice: ["Br", "Break", "Lb"],
        answer: 3
    }
];

//Getting all the needed elements from the html
const start= document.getElementById("start");
const quiz= document.getElementById("quiz");
const counter= document.getElementById("counter");
const next= document.getElementById("next");
const feedback= document.getElementById("feedback");

const record= document.getElementById("record");
const report= document.getElementById("report");
const score= document.getElementById("score");

const log= document.getElementById("log");
const hsTable= document.getElementById("hsTable");
const hs= document.getElementById("highscores");
let oldtbody= document.querySelector('tbody');

const timerContainer= document.getElementById("timer");
const timer= document.getElementById("timer");

const question= document.getElementById("question");
const choiceA= document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC= document.getElementById("C");

//Initializing some variables that I need
let quizTimer;
let runningQuestion;
let timerInterval;

// This is when you click on Begin Quiz. 
function begin(){

    //Showing all necessary containers for the quiz
    quiz.setAttribute("style", "display: inital");
    start.setAttribute("style", "display: none");
    report.setAttribute("style", "display: none");
    hs.setAttribute("style", "display: none");

    //Setting to question 1 and timer to 75
    runningQuestion=0;
    quizTimer=75;
    //Showing the question
    showQuestion(runningQuestion);

    //Countdown goes from 75 to 0 when at 0 it goes to screen where you enter high score into local storage
    timerInterval=setInterval(function(){
            quizTimer--
            timer.innerHTML=quizTimer;

            if (quizTimer==0){
                clearInterval(timerInterval);
                quiz.setAttribute("style", "display: none");
                report.setAttribute("style", "display: initial");
                start.setAttribute("style", "display: initial");
                score.innerHTML="Your score is "+ quizTimer;
            }
    }, 1000)
}
start.addEventListener("click", begin);

//Function to show the question 
function showQuestion(){
    let q= questions[runningQuestion];
    question.innerHTML= "<p>"+ q.question+"</p>";
    choiceA.innerHTML=q.choice[0];
    choiceB.innerHTML=q.choice[1];
    choiceC.innerHTML=q.choice[2];
}

//Function to check the answer. If its wrong subtract 5 secs from the timers. 
function checkAnswer(answer){
    let q= questions[runningQuestion]
    if (q.answer==answer){
        feedback.innerHTML="Correct";
    }
    else{
        quizTimer=quizTimer-5;
        feedback.innerHTML="Incorrect";
    }
    if (runningQuestion<(questions.length-1)){
        runningQuestion++;
        showQuestion(runningQuestion);
    }else{
        clearInterval(timerInterval);
        quiz.setAttribute("style", "display: none");
        report.setAttribute("style", "display: initial");
        start.setAttribute("style", "display: initial");
        score.innerHTML="Your score is "+ quizTimer;

    }
}

// When you click on store high scores, it prompts to enter name and then stores score in local storage
function storeHighScore(){
    let name= window.prompt("Enter name");
    localStorage.setItem(name, quizTimer);
}
record.addEventListener("click", storeHighScore)

//function to show high score table 
function viewHighScores(){

    //this doesnt work but it was my attempt at deleting the old table so there will be no repeated values. 
    // newTbody= document.createElement('tbody');
    // oldtbody.parentNode.replaceChild(newTbody, oldtbody);
    // oldtbody=document.querySelector('tbody');
    quiz.setAttribute("style", "display: none");
    report.setAttribute("style", "display: none");
    start.setAttribute("style", "display: initial");

    for (let i=0; i<localStorage.length; i++){
        // Showing the table 
        hs.setAttribute("style", "display: initial");
        //Inserting new rows at the end of the table
        let row= hsTable.insertRow(-1);
        let cell1= row.insertCell(0);
        let cell2= row.insertCell(1);
        //Inserting each entry from local storage
        cell1.innerHTML= localStorage.key(i);
        cell2.innerHTML= localStorage.getItem(localStorage.key(i));
        
    }

}
log.addEventListener("click", viewHighScores);