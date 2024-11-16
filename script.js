const questions = [
    {
        question: "How do you feel about math without a calculator?",
        answers: [
            { text: "I'm confident solving math problems without a calculator.", gre: 1, gmat: 3 },
            { text: "I prefer having a calculator for complex math problems.", gre: 3, gmat: 1 }
        ]
    },
    {
        question: "How do you approach data interpretation and analysis?",
        answers: [
            { text: "I enjoy interpreting data and solving real-world problems.", gre: 1, gmat: 3 },
            { text: "I prefer straightforward math and reasoning questions.", gre: 3, gmat: 1 }
        ]
    },
    {
        question: "Imagine you’re taking a test, and the difficulty of the next question depends on how well you answered the previous one. How does this make you feel?",
        answers: [
            { text: "I’d find it motivating to see the questions adjust based on my performance.", gre: 1, gmat: 3 },
            { text: " I’d find it stressful and would prefer the test difficulty to be consistent throughout each section.", gre: 3, gmat: 1 }
        ]
    },
    {
        question: "Do you feel confident with integrated reasoning questions (graphs, charts, and data interpretation)",
        answers: [
            { text: "Yes, I’m comfortable analyzing integrated data.", gre: 3, gmat: 1 },
            { text: "No, I’d prefer questions more focused on verbal and quantitative skills.", gre: 1, gmat: 3 }
        ]
    },
    {
        question: "You’re tasked with helping a colleague improve a written report. Which part of the task would you feel more confident handling?",
        answers: [
            { text: "Identifying and fixing grammatical errors and ensuring the arguments are logically sound.", gre: 1, gmat: 3 },
            { text: "Rewriting sentences to use more precise and advanced vocabulary, making the language more polished.", gre: 3, gmat: 1 }
        ]
    },
    // GRE/GMAT-specific questions
    {
        question: "Select the answer that best completes the sentence: The professor’s reputation for arrogance was so _____ that she often found it difficult to get students to speak up in her class.",
        answers: [
            { text: "unknown", gre: 0, gmat: 0 },
            { text: "formidable", gre: 2, gmat: 0 }, // Correct answer for GRE
            { text: "irrelevant", gre: 0, gmat: 0 },
            { text: "disarming", gre: 0, gmat: 0 },
            { text: "irrefutable", gre: 0, gmat: 0 }
        ]
    },
    {
        question: "Compare Quantity A and Quantity B and determine the relationship: Quantity A: 5^2 + 3^2; Quantity B: 7^2",
        answers: [
            { text: "Quantity A is greater", gre: 0, gmat: 0 },
            { text: "Quantity B is greater", gre: 2, gmat: 0 }, // Correct answer for GRE
            { text: "The two quantities are equal", gre: 0, gmat: 0 },
            { text: "The relationship cannot be determined", gre: 0, gmat: 0 }
        ]
    },
    {
        question: "If x and y are positive integers, is x + y > 10? (1) x > 7 (2) y > 3",
        answers: [
            { text: "Statement (1) ALONE is sufficient", gre: 0, gmat: 2 }, // Correct answer for GMAT
            { text: "Statement (2) ALONE is sufficient", gre: 0, gmat: 0 },
            { text: "BOTH statements TOGETHER are sufficient", gre: 0, gmat: 0 },
            { text: "EACH statement ALONE is sufficient", gre: 0, gmat: 0 },
            { text: "Statements (1) and (2) TOGETHER are not sufficient", gre: 0, gmat: 0 }
        ]
    },
    {
        question: "Environmentalists argue that one of the reasons deforestation occurs is because local people need wood for fuel. Which of the following, if true, most weakens the argument?",
        answers: [
            { text: "The government has recently enacted a ban on wood cutting", gre: 0, gmat: 0 },
            { text: "Local people use alternative sources of fuel, such as solar power", gre: 0, gmat: 2 }, // Correct answer for GMAT
            { text: "Wood is one of the most readily available resources", gre: 0, gmat: 0 },
            { text: "The government encourages replanting", gre: 0, gmat: 0 },
            { text: "The demand for wood has been steadily increasing", gre: 0, gmat: 0 }
        ]
    },
    {
        question: "A company’s profit was $48,000 last year and $60,000 this year. What was the percent increase in the company’s profit?",
        answers: [
            { text: "10%", gre: 0, gmat: 0 },
            { text: "20%", gre: 0, gmat: 0 },
            { text: "25%", gre: 2, gmat: 0 }, // Correct answer for GRE
            { text: "30%", gre: 0, gmat: 0 },
            { text: "40%", gre: 0, gmat: 0 }
        ]
    }
];

let currentQuestionIndex = 0;
let greScore = 0;
let gmatScore = 0;
let selectedAnswers = Array(questions.length).fill(null);

function startQuiz() {
    currentQuestionIndex = 0;
    greScore = 0;
    gmatScore = 0;
    selectedAnswers = Array(questions.length).fill(null);
    document.getElementById('quiz-container').classList.remove('d-none');
    document.getElementById('result-container').classList.add('d-none');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('question-count').innerText = `${currentQuestionIndex + 1}/${questions.length} Questions`;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer-option');
        
        // Check if this answer is already selected
        if (selectedAnswers[currentQuestionIndex] === index) {
            answerDiv.classList.add('selected');
        }

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.checked = selectedAnswers[currentQuestionIndex] === index;
        radio.onclick = (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to answerDiv
            selectAnswer(answerDiv, answer, index);
        };

        const label = document.createElement('label');
        label.innerText = answer.text;

        answerDiv.appendChild(radio);
        answerDiv.appendChild(label);
        answerDiv.onclick = () => selectAnswer(answerDiv, answer, index); // Make entire div clickable
        answerButtons.appendChild(answerDiv);
    });

    const nextButton = document.getElementById('next-button');
    nextButton.classList.toggle('disabled', selectedAnswers[currentQuestionIndex] === null);
    nextButton.disabled = selectedAnswers[currentQuestionIndex] === null;

    document.getElementById('back-button').classList.toggle('d-none', currentQuestionIndex === 0);
}

function selectAnswer(answerDiv, answer, index) {
    selectedAnswers[currentQuestionIndex] = index;

    // Highlight the selected answer
    document.querySelectorAll('.answer-option').forEach(option => option.classList.remove('selected'));
    answerDiv.classList.add('selected');

    // Mark the radio button as checked
    const radio = answerDiv.querySelector('input[type="radio"]');
    radio.checked = true;

    // Enable the "Continue" button
    const nextButton = document.getElementById('next-button');
    nextButton.classList.remove('disabled');
    nextButton.disabled = false;
}

function nextQuestion() {
    if (selectedAnswers[currentQuestionIndex] === null) return; // Prevent skipping if no answer selected

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function backQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showResults() {
    document.getElementById('quiz-container').classList.add('d-none');
    document.getElementById('result-container').classList.remove('d-none');
    const resultText = document.getElementById('result-text');
    if (greScore > gmatScore) {
        resultText.innerText = "Based on your responses, you may be better suited for the GRE!";
    } else if (gmatScore > greScore) {
        resultText.innerText = "Based on your responses, you may be better suited for the GMAT!";
    } else {
        resultText.innerText = "Based on your responses, you may be better suited for the GRE!";
    }
}

startQuiz();

