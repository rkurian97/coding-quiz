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

let quizTimer;
let runningQuestion;
let timerInterval;

function begin(){
    quiz.setAttribute("style", "display: inital");
    start.setAttribute("style", "display: none");
    report.setAttribute("style", "display: none");
    hs.setAttribute("style", "display: none");
    runningQuestion=0;
    quizTimer=75;
    showQuestion(runningQuestion);
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

function showQuestion(){
    let q= questions[runningQuestion];
    question.innerHTML= "<p>"+ q.question+"</p>";
    choiceA.innerHTML=q.choice[0];
    choiceB.innerHTML=q.choice[1];
    choiceC.innerHTML=q.choice[2];
}

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

function storeHighScore(){
    let name= window.prompt("Enter name");
    localStorage.setItem(name, quizTimer);
}
record.addEventListener("click", storeHighScore)

function viewHighScores(){
    newTbody= document.createElement('tbody');
    oldtbody.parentNode.replaceChild(newTbody, oldtbody);
    oldtbody=document.querySelector('tbody');

    for (let i=0; i<localStorage.length; i++){
        quiz.setAttribute("style", "display: none");
        report.setAttribute("style", "display: none");
        start.setAttribute("style", "display: initial");
    

        hs.setAttribute("style", "display: initial");

        let row= hsTable.insertRow(-1);
        let cell1= row.insertCell(0);
        let cell2= row.insertCell(1);
        cell1.innerHTML= localStorage.key(i);
        cell2.innerHTML= localStorage.getItem(localStorage.key(i));
        
    }

}
log.addEventListener("click", viewHighScores);