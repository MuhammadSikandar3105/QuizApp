const mainquiz = document.querySelector('.main-quiz');
const startBtn = document.querySelector('.startBtn');
const RetryBtn = document.querySelector('.retryBtn');
const highestScore = document.querySelector('.highestScore');
let question = document.querySelector('.question');
let background = document.querySelector('body');
const options = document.querySelector('.options');
const option = document.querySelector('.option');
const timercolor = document.querySelector('.timer');
const nextBtn = document.querySelector('.nextBtn');
const resultSeeBtn = document.querySelector('.resultSeeBtn');
const quizCount = document.querySelector('.quizCount');
const time = document.querySelector('.time');
const quote = document.querySelector('.quote');
const scoreText = document.querySelector('.score-text');
const progressCircle = document.querySelector('.progress-ring__progress');

// Quiz questions and answers
const quizes = [
    { question: 'What is the full form of HTML?', answers: ['HyperText Meaning Language', 'Hyper Told Markup Language', 'Hyfer Text Markup Language', 'HyperText Markup Language'] },
    { question: 'Which HTML tag is used to define an internal style sheet?', answers: ['<style>', '<css>', '<script>', '<link>'] },
    { question: 'What does the <a> tag define in HTML?', answers: ['An anchor or hyperlink', 'A heading', 'An image', 'A paragraph'] },
    { question: 'Which attribute is used to provide an alternative text for an image?', answers: ['alt', 'src', 'title', 'href'] },
    { question: 'What is the purpose of the <head> section in HTML?', answers: ['To store metadata about the document', 'To display the main content', 'To create links', 'To add images'] },
    { question: 'What does the <title> tag do in an HTML document?', answers: ['Displays the document’s title in the browser tab', 'Creates a heading', 'Links to an external stylesheet', 'Displays an image'] },
    { question: 'Which attribute is used to open a link in a new tab?', answers: ['target="_blank"', 'rel="new"', 'open="new"', 'link="blank"'] },
    { question: 'How do you add a comment in HTML?', answers: ['<!-- Comment -->', '// Comment', '/* Comment */', '# Comment'] },
    { question: 'What does the <br> tag do in HTML?', answers: ['Inserts a line break', 'Adds a border', 'Creates a space', 'Creates a list'] },
    { question: 'Which HTML tag is used to define an unordered list?', answers: ['<ul>', '<ol>', '<li>', '<dl>'] },
    { question: 'What does the <table> tag represent in HTML?', answers: ['A table', 'A form', 'A paragraph', 'A heading'] },
    { question: 'Which tag is used to create a table row in HTML?', answers: ['<tr>', '<td>', '<th>', '<row>'] },
    { question: 'What attribute is used to define the source URL of an image?', answers: ['src', 'alt', 'href', 'link'] },
    { question: 'What tag is used to display a checkbox in HTML?', answers: ['<input type="checkbox">', '<checkbox>', '<input type="box">', '<check>'] },
    { question: 'What does the <strong> tag do in HTML?', answers: ['Makes text bold', 'Makes text italic', 'Underlines text', 'Changes text color'] },
    { question: 'Which tag is used to define a paragraph in HTML?', answers: ['<p>', '<par>', '<paragraph>', '<text>'] },
    { question: 'Which tag is used for creating a dropdown list in HTML?', answers: ['<select>', '<dropdown>', '<option>', '<list>'] },
    { question: 'What does the <em> tag represent in HTML?', answers: ['Emphasized text', 'Strong text', 'Underlined text', 'Italic text'] },
    { question: 'Which HTML attribute is used to set the character encoding for the document?', answers: ['charset', 'type', 'encoding', 'lang'] },
    { question: 'What tag is used to create a hyperlink in HTML?', answers: ['<a>', '<link>', '<href>', '<url>'] },
    { question: 'Which tag is used to display a numbered list?', answers: ['<ol>', '<ul>', '<li>', '<dl>'] },
    { question: 'What is the purpose of the <meta> tag in HTML?', answers: ['To define metadata about an HTML document', 'To create a link to another page', 'To embed an image', 'To add JavaScript'] },
    { question: 'What tag is used to embed an image in an HTML page?', answers: ['<img>', '<image>', '<pic>', '<src>'] },
    { question: 'Which HTML attribute specifies an input field must be filled out?', answers: ['required', 'mandatory', 'fill', 'need'] },
    { question: 'What is the correct HTML tag for inserting a line break?', answers: ['<br>', '<break>', '<lb>', '<line>'] }
];
const correctAnswers = ['HyperText Markup Language', // for question 1
    '<style>',                   // for question 2
    'An anchor or hyperlink',    // for question 3
    'alt',                       // for question 4
    'To store metadata about the document', // for question 5
    'Displays the document’s title in the browser tab', // for question 6
    'target="_blank"',           // for question 7
    '<!-- Comment -->',          // for question 8
    'Inserts a line break',      // for question 9
    '<ul>',                      // for question 10
    'A table',                   // for question 11
    '<tr>',                      // for question 12
    'src',                       // for question 13
    '<input type="checkbox">',   // for question 14
    'Makes text bold',           // for question 15
    '<p>',                       // for question 16
    '<select>',                  // for question 17
    'Emphasized text',           // for question 18
    'charset',                   // for question 19
    '<a>',                       // for question 20
    '<ol>',                      // for question 21
    'To define metadata about an HTML document', // for question 22
    '<img>',                     // for question 23
    'required',                  // for question 24
    '<br>'                       // for question 25
];
const Quotes = [
    "“It’s okay to miss the mark—this is just a stepping stone. Try again, and you’ll go even further!”",
    "“You’re making progress! Review what you missed, and you’ll be closer to your target next time.”",
    "“Nice effort! You’ve got a strong foundation—just a few more steps to mastery!”",
    "“Impressive! You’re doing great—just a few points from perfection!",
    "“You’re nearly flawless! With just a tiny bit more, you’ll reach perfection!”",
    "“Congratulations on a perfect score! You’re a true expert in this topic.”"
];
let index = 0;
let score = 0;
let timeInterval;
const timeLimit = 30;

// Start the quiz
startBtn.addEventListener('click', () => {
    startBtn.parentElement.parentElement.classList.add('quizes', 'played');
    startQuiz();
});
RetryBtn.addEventListener('click', () => {
    startBtn.parentElement.parentElement.classList.add('quizes', 'played');
    mainquiz.parentElement.classList.remove('result');
    background.classList.remove('resultQuizes');
    startQuiz();
});

const startQuiz = () => {
    index = 0;
    score = 0;
    showQuestion();
    startTimer();
    background.classList.add('startQuizes');
};

// Display each question
const showQuestion = () => {
    quizCount.textContent = `${index + 1}/${quizes.length}`;
    question.textContent = quizes[index].question;

    // Function to escape HTML tags
    const escapeHTML = (text) => {
        const element = document.createElement('div');
        element.textContent = text;
        return element.innerHTML; // Returns the escaped HTML as plain text
    };
    // options of questions
    options.innerHTML = quizes[index].answers.map((answer, i) => `
        <div class="option" data-answer="${escapeHTML(answer)}">
            <span>${escapeHTML(answer)}</span>
            <span class="wrong-choose">You choose<img src="assets/wrong.png" alt="wrong"></span>
        <img class="correctOp" src="assets/correct.png" alt="correct">
        </div>
    `).join('');

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', handleAnswer);
    });
};

// Handle answer selection
const handleAnswer = (event) => {
    clearInterval(timeInterval);
    const selectedAnswer = event.currentTarget.getAttribute('data-answer');

    // Check if selected answer is correct
    if (selectedAnswer === correctAnswers[index]) {
        event.currentTarget.classList.add('correct');
        score++;
    } else {
        event.currentTarget.classList.add('wrong');
        document.querySelector(`.option[data-answer="${correctAnswers[index]}"]`).classList.add('correct');
    }

    // Disable further clicks and enable Next button
    document.querySelectorAll('.option').forEach(opt => opt.removeEventListener('click', handleAnswer));
    nextBtn.disabled = false;
    // console.log(`Selected answer: ${selectedAnswer}, Correct answer: ${correctAnswers[index]}, Score: ${score}`);
};

// Timer function
const startTimer = () => {
    let timeLeft = timeLimit;
    time.innerHTML = `00:${timeLeft}`;
    clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        timeLeft -= 1;
        time.innerHTML = `00:${timeLeft > 9 ? timeLeft : '0' + timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            nextQuestion();
            background.classList.remove('endingQuizes');
            background.classList.add('startQuizes');
        } else if (timeLeft < 10) {
            background.classList.add('endingQuizes');
            background.classList.remove('centerQuizes');
        } else if (timeLeft < 15) {
            background.classList.add('centerQuizes');
            background.classList.remove('startQuizes');
        }
    }, 1000);
};

// Move to the next question
const nextQuestion = () => {
    if (index < quizes.length - 1) {
        index++;
        showQuestion();
        startTimer();
        nextBtn.disabled = true;
    } else {
        showResults();
    }
};

// Next button event
nextBtn.addEventListener('click', () => {
    background.classList.remove('centerQuizes');
    background.classList.remove('endingQuizes');
    background.classList.add('startQuizes');
    nextQuestion()
});

resultSeeBtn.addEventListener('click', () => {
    background.classList.remove('centerQuizes');
    background.classList.remove('endingQuizes');
    background.classList.remove('startQuizes');
    background.classList.add('resultQuizes');
    showResults()
});

// Show the final results
const totalQuestions = quizes.length;
const radius = 111;
const circumference = 2 * Math.PI * radius;

// Set circle circumference
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Function to update progress based on correct answers
function updateProgress(correctAnswers) {
    scoreText.textContent = `${correctAnswers}/${totalQuestions}`;

    // Calculate the green portion based on the score
    const offset = circumference - (correctAnswers / totalQuestions) * circumference;

    // Update the green segment to show the correct portion
    progressCircle.style.strokeDashoffset = offset;

    if (correctAnswers <= 5) {
        quote.innerHTML = Quotes[0]
    } else if (correctAnswers <= 10) {
        quote.innerHTML = Quotes[1]
    } else if (correctAnswers <= 15) {
        quote.innerHTML = Quotes[2]
    } else if (correctAnswers <= 20) {
        quote.innerHTML = Quotes[3]
    } else if (correctAnswers <= 24) {
        quote.innerHTML = Quotes[4]
    } else if (correctAnswers <= 25) {
        quote.innerHTML = Quotes[5]
    }
}


const showResults = () => {
    mainquiz.parentElement.classList.add('result');
    background.classList.add('resultQuizes');
    updateProgress(score);
};







