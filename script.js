var score = 0;
var thequestion = -1;
var time = 0;
var timer;


var questions = [{
    title: "What is HTML",
    choices: ["1.Hypertext Markup Language", "2.Hyper text mark language", "3.hype total markup liver", "4.an abbreviation"],
    answer: "1.Hypertext Markup Language"
    },
    {
    title: "What is CSS",
    choices: ["1.Cascading Style Sheets", "2.Stlying lanaguage", "3.used to style an html doc", "4.All of the above"],
    answer: "4.All of the above"
    },
    {
    title: "Which of the following functions define the background color of this webpage?",
    choices: ["1.background-color: #ff00006b;", "2.background-color: white", "3.background-color: none", "4.None of the above."],
    answer: "4.None of the above."
    },
    {
    title: "A very useful tool for development and debugging for printing content to the debugger is:",
    choices: ["1.console log", "2.css", "3.javascript", "4.VS code"],
    answer: "1.console log"
    }

]

function start() {

    time = 75;
    document.getElementById("time").innerHTML = time;

    timer = setInterval(function() {
        time--;
        document.getElementById("time").innerHTML = time;
        if (time <= 0) {
            clearInterval(timer);
            end(); 
        }
    }, 1000);

    next();
}

function end() {
    clearInterval(timer);

    var quizContent = `
    <h1>Youv'e reached the end!</h1>
    <h2` + score +  ` /100!</h2>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="save()">Save your Score!</button>`;

    document.getElementById("maincontent").innerHTML = quizContent;
}

function save() {
    localStorage.setItem("score", score);
    localStorage.setItem("initials",  document.getElementById('name').value);
    scores();
}

function scores() {
    var quizContent = `
    <h1>` + localStorage.getItem("initials") + `'s score is:</h1>
    <h1>` + localStorage.getItem("score") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score</button><button onclick="reset()">Again!</button>`;

    document.getElementById("maincontent").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("initials", "");
    localStorage.setItem("score",  "");

    reset();
}

function reset() {
    clearInterval(timer);
    score = 0;
    thequestion = -1;
    time = 0;
    timer = null;

    document.getElementById("time").innerHTML = time;

    var quizContent = `
    <h1>
       Code Quiz Master!
    </h1>
    <button onclick="start()">Start!</button>`;

    document.getElementById("maincontent").innerHTML = quizContent;
}

function incorrect() {
    time -= 10; 
    next();
}

function correct() {
    score += 10;
    next();
}

function next() {
    thequestion++;

    if (thequestion > questions.length - 1) {
        end();
        return;
    }

    var quizContent = "<h2>" + questions[thequestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[thequestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[thequestion].choices[buttonLoop]);
        if (questions[thequestion].choices[buttonLoop] == questions[thequestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

document.getElementById("maincontent").innerHTML = quizContent;
}