const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Модель моего смартфона?',
        option: [
        'Xiaomi Redmi Note 6',
        'Honor 30i',
        'IPhone 7 Plus',
        'Nokia 3310',
    ],
        rightAnswer: 2
    },
    {
        question: 'Город в котором я живу?',
        option: [
         'Москва',
         'Челябинск',
         'Санкт-Петербург',
         'я живу в казарме',
        ],
        rightAnswer: 1
        },
        {
        question: 'Мой первый автомобиль?',
        option: [
         'Газель',
         'Ваз-2101',
         'Toyota Camry',
         'Nissan Sunny',
        ],
        rightAnswer: 3
    },
    {
        question: 'Любимое блюдо?',
        option: [
         'Хачапури по аджарски',
         'Сосиска в тесте',
         'Макарошки с сосисочками',
         'Много кушать вредно!',
        ],
        rightAnswer: 0
    }
]

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].option[0];
    option2.innerHTML = questions[indexOfQuestion].option[1];
    option3.innerHTML = questions[indexOfQuestion].option[2];
    option4.innerHTML = questions[indexOfQuestion].option[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completeAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completeAnswers.length > 0) {
            completeAnswers.forEach(item => {
                if(item == randomNumber){
                    hitDublicate = true;
                }
            })
            if(hitDublicate){
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load()
            }
        }
        if(completeAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load()
        }
    }
    completeAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    console.log(el)
   if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions(); 
}

for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled' , 'correct' , 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Не выбран вариант ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click' , tryAgain);

btnNext.addEventListener('click' , () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})


