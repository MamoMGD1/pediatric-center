const defaultQuestions = [
    {
        question: "What is the primary role of a hospital assistant?",
        options: ["A. Medical diagnosis", "B. Assisting doctors", "C. Managing hospital finances", "D. Performing surgeries"],
        answer: "B"
    },
    {
        question: "What should an assistant do in case of an emergency?",
        options: ["A. Call for help", "B. Ignore the patient", "C. Document the incident", "D. Perform surgery"],
        answer: "A"
    },
    {
        question: "What is the most important quality for a hospital assistant?",
        options: ["A. Speed in performing tasks", "B. Attention to detail", "C. Ability to multitask", "D. Knowledge of hospital finances"],
        answer: "B"
    }
];
let questions = JSON.parse(localStorage.getItem("questions"));
if(!questions){
    localStorage.setItem("questions", JSON.stringify(defaultQuestions));
    questions = JSON.parse(localStorage.getItem("questions"));
}
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;
function startQuiz() {
    document.getElementById("startQuizSection").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    startTimer();
    loadQuestion(); // Function to display the first question
}
function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = " 00:" + String(timeLeft).padStart(2, "0");
    document.getElementById("timer").classList.add(".backChange");
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = " 00:" + String(timeLeft).padStart(2, "0");

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            disableNextButton(); // Stop the quiz if the timer reaches zero
        }
    }, 1000);
}
function disableNextButton() {
    document.getElementById("nextButton").disabled = true; // Disable Next button
    setTimeout(() => {
        showResults(); // Automatically show results if time runs out
    }, 3000);
}
function loadQuestion() {
    document.getElementById("nextButton").disabled = false;
    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = `${currentQuestionIndex+1}. ${questionObj.question}`;
    const optionElements = document.querySelectorAll(".option-text");
    optionElements.forEach((option, index) => {
        option.innerText = questionObj.options[index];
    });
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.querySelector(".progress-fill");
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
}
let checkedAnswer = false;
function nextQuestion() {
    if(!checkedAnswer)
        checkAnswer();
    checkedAnswer = false;
    const selectedOption = document.querySelector("input[name='answer']:checked");
    const parentLabel = selectedOption.closest("label"); // Get the parent label element
    parentLabel.style.backgroundColor = ""; // Clear the background color
    selectedOption.checked = false;
    const correctOption = document.querySelector(`input[name='answer'][value='${questions[currentQuestionIndex].answer}']`);
    if (correctOption) {
        const correctLabel = correctOption.closest("label");
        correctLabel.style.backgroundColor = "";
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Reset and restart timer animation
        const timerElement = document.getElementById("timer");
        timerElement.classList.remove("backChange");  // Remove class
        void timerElement.offsetWidth;  // Trigger reflow to restart animation
        showResults();
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");

    if (selectedOption) {
        const answer = selectedOption.value;
        const parentLabel = selectedOption.closest("label"); // Get the parent label element

        if (answer === questions[currentQuestionIndex].answer) {
            parentLabel.style.backgroundColor = "yellowgreen";
            score++;
            checkedAnswer = true;
        } else {
            parentLabel.style.backgroundColor = "red";
            
            // Highlight the correct option
            const correctAnswer = questions[currentQuestionIndex].answer;
            const correctOption = document.querySelector(`input[name='answer'][value='${correctAnswer}']`);
            
            if (correctOption) {
                const correctLabel = correctOption.closest("label");
                correctLabel.style.backgroundColor = "green"; // Highlight the correct answer
            }
        }
    }
}
function showResults() {
    clearInterval(timerInterval);
    document.querySelector(".question-section").style.display = "none";
    document.querySelector(".quiz-footer").style.display = "none";
    const resultsSection = document.querySelector(".results-section");
    document.getElementById("score").innerText = `${score} / ${questions.length}`;
    resultsSection.style.display = "block";
}

function restartQuiz() {
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    // Reset and restart timer animation
    const timerElement = document.getElementById("timer");
    timerElement.classList.remove("backChange");  // Remove class
    void timerElement.offsetWidth;  // Trigger reflow to restart animation
    timerElement.classList.add("backChange");  // Re-add class
    document.getElementById("timer").textContent = " 00:" + String(timeLeft).padStart(2, "0"); // Reset the displayed timer
    document.querySelector(".question-section").style.display = "block";
    document.querySelector(".quiz-footer").style.display = "flex";
    document.querySelector(".results-section").style.display = "none";
    // Reset background color for all options
    const options = document.querySelectorAll("input[name='answer']");
    options.forEach(option => {
        option.checked = false; // Uncheck all options
        option.closest("label").style.backgroundColor = ""; // Reset the background color
    });
    loadQuestion();
    startTimer();
}
function highlightSelectedOption() {
    const options = document.querySelectorAll("input[name='answer']");

    options.forEach(option => {
        option.addEventListener("click", function() {
            // Reset background color for all options
            options.forEach(opt => opt.closest("label").style.backgroundColor = "");
            // Set background color for the clicked option
            option.closest("label").style.backgroundColor = "#0caeae";
        });
    });
}
document.addEventListener("DOMContentLoaded", function(){
    if(activeUser.userType !== "instructor"){
        document.addEventListener("DOMContentLoaded", loadQuestion);
        document.addEventListener("DOMContentLoaded", highlightSelectedOption);  
        document.querySelector("main").style.marginBottom = "240px";  
    }
    else{
        document.getElementById("startQuizSection").style.display = "none";
        document.addEventListener("DOMContentLoaded", showTheQuestions())
    }
})
document.addEventListener("DOMContentLoaded", highlightSelectedOption);    

function showTheQuestions(){
    const questionBoardDiv = document.createElement("div");
    questionBoardDiv.innerHTML = "<div id='questionBoard' style='margin: 20px;'></div>";
    document.querySelector(".page-container").appendChild(questionBoardDiv);
    const questionBoardContainer = document.getElementById("questionBoard");
    questionBoardContainer.innerHTML = ""; // Clear any existing content
    let index = 0;
    // Retrieve questions from localStorage
    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    // Loop through questions to create the display for each question
    questions.forEach((question, index) => {

        // Create question container
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        // Display the question text
        const questionText = document.createElement("h3");
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionContainer.appendChild(questionText);
        // Display answer choices
        question.options.forEach((option, optionIndex) => {
            const optionBox = document.createElement("div");
            optionBox.classList.add("option-box");

            // Highlight the correct answer in green
            if (option.startsWith(question.answer)) {
                optionBox.style.backgroundColor = "#DFF0D8"; // Light green for correct answer
                optionBox.style.fontWeight = "bold";
            }

            optionBox.textContent = option;
            questionContainer.appendChild(optionBox);
        });
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "space-evenly";
        buttonContainer.style.marginTop = "10px";
        // Add Edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit Question";
        editButton.onclick = () => editQuestion(index);
        buttonContainer.appendChild(editButton);

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete Question";
        deleteButton.onclick = () => deleteQuestion(index);
        buttonContainer.appendChild(deleteButton);
        
        questionContainer.appendChild(buttonContainer);
        questionBoardContainer.appendChild(questionContainer);
        document.querySelector(".page-container").appendChild(questionBoardContainer);
    });

    // Add "Add New Question" button at the bottom of the board
    const addQuestionButton = document.createElement("button");
    addQuestionButton.classList.add("add-question-btn");
    addQuestionButton.textContent = "Add New Question";
    addQuestionButton.onclick = () => addNewQuestion();
    questionBoardContainer.appendChild(addQuestionButton);

    // Helper functions
    function editQuestion(index) {
        const question = questions[index];
        const newQuestionText = prompt("Edit the question:", question.question);
        if (newQuestionText) question.question = newQuestionText;

        const newOptions = question.options.map((option, i) =>
            prompt(`Edit option ${i + 1}:`, option) || option
        );

        question.options = newOptions;

        const newAnswer = prompt("Edit the correct answer (A, B, C, or D):", question.answer);
        if (newAnswer) question.answer = newAnswer;

        saveQuestions();
        location.reload();
    }

    function deleteQuestion(index) {
        if (confirm("Are you sure you want to delete this question?")) {
            questions.splice(index, 1);
            saveQuestions();
            location.reload();
        }
    }

    function addNewQuestion() {
        const questionText = prompt("Enter the question:");
        const options = [
            "A. " + prompt("Enter option A:"),
            "B. " + prompt("Enter option B:"),
            "C. " + prompt("Enter option C:"),
            "D. " + prompt("Enter option D:"),
        ];
        const answer = prompt("Enter the correct answer (A, B, C, or D):");

        if (questionText && options.every(opt => opt) && answer) {
            questions.push({ question: questionText, options, answer });
            saveQuestions();
            location.reload();
        } else {
            alert("Please fill out all fields for the new question.");
        }
    }

    function saveQuestions() {
        localStorage.setItem("questions", JSON.stringify(questions));
    }
}
