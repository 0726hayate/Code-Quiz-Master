// Define an array to store scores and initials
const highScores = [];

document.addEventListener("DOMContentLoaded", function () {
    const scoreLink = document.getElementById("scoreLink");
    const startButton = document.getElementById("startButton");
    const timeElement = document.getElementById("time");
    const mainContent = document.getElementById("maincontent");

    let score = 0;
    let currentQuestionIndex = -1;
    let time = 0;
    let timer;

    const questions = [
        {
            title: "What is HTML?",
            choices: ["1. Hypertext Markup Language", "2. Hyper text mark language", "3. Hype total markup liver", "4. An abbreviation"],
            answer: "1. Hypertext Markup Language"
        },
        {
            title: "What is CSS?",
            choices: ["1. Cascading Style Sheets", "2. Styling language", "3. Used to style an HTML doc", "4. All of the above"],
            answer: "4. All of the above"
        },
        {
            title: "Which of the following functions defines the background color of this webpage?",
            choices: ["1. background-color: #ff00006b;", "2. background-color: white", "3. background-color: none", "4. None of the above."],
            answer: "4. None of the above."
        },
        {
            title: "A very useful tool for development and debugging for printing content to the debugger is:",
            choices: ["1. console log", "2. CSS", "3. JavaScript", "4. VS Code"],
            answer: "1. console log"
        }
    ];

    function start() {
        time = 75;
        timeElement.textContent = time;

        timer = setInterval(function () {
            time--;
            timeElement.textContent = time;
            if (time <= 0) {
                clearInterval(timer);
                end();
            }
        }, 1000);

        next();
    }

    function end() {
        clearInterval(timer);

        const quizContent = `
            <h1>You've reached the end!</h1>
            <h2>${score} / 100!</h2>
            <input type="text" id="name" placeholder="First name">
            <button onclick="save()">Save your Score!</button>`;

        mainContent.innerHTML = quizContent;
    }

    function save() {
        const initials = document.getElementById('name').value;
        const playerScore = { initials, score };
        
        // Add the player's score to the array
        highScores.push(playerScore);

        // Sort the scores in descending order
        highScores.sort((a, b) => b.score - a.score);

        // Keep only the top 10 scores
        highScores.splice(10);

        // Store scores in local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));

        scores();
    }

    function scores() {
        const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
        const initials = localStorage.getItem("initials");
        const savedScore = localStorage.getItem("score");

        let quizContent = "";

        if (savedScores.length > 0) {
            quizContent += "<h1>Top 10 Scores:</h1>";

            for (let i = 0; i < savedScores.length; i++) {
                quizContent += `<p>${savedScores[i].initials}: ${savedScores[i].score}</p>`;
            }
        } else {
            quizContent += "<p>No scores saved yet.</p>";
        }

        quizContent += `
            <h1>${initials}'s score is:</h1>
            <h1>${savedScore}</h1><br>
            <button onclick="clearScore()">Clear score</button><button onclick="reset()">Again!</button>`;

        mainContent.innerHTML = quizContent;
    }

    function clearScore() {
        localStorage.setItem("initials", "");
        localStorage.setItem("score", "");

        reset();
    }

    function reset() {
        clearInterval(timer);
        score = 0;
        currentQuestionIndex = -1;
        time = 0;
        timer = null;
        timeElement.textContent = time;

        const quizContent = `
            <h1>Code Quiz Master!</h1>
            <button onclick="start()">Start!</button>`;

        mainContent.innerHTML = quizContent;
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
        currentQuestionIndex++;

        if (currentQuestionIndex > questions.length - 1) {
            end();
            return;
        }

        const question = questions[currentQuestionIndex];
        let quizContent = `<h2>${question.title}</h2>`;

        for (let i = 0; i < question.choices.length; i++) {
            const choice = question.choices[i];
            const isCorrect = choice === question.answer;
            const onclick = isCorrect ? "correct()" : "incorrect()";
            quizContent += `<button onclick="${onclick}">${choice}</button>`;
        }

        mainContent.innerHTML = quizContent;
    }

    
});
