class Question {

  constructor(question, questionAttributes) {
    this.id = question.id;
    this.game_id = questionAttributes.game_id;
    this.q = questionAttributes.q;
    this.aa = questionAttributes.aa;
    this.ab = questionAttributes.ab;
    this.ac = questionAttributes.ac;
    this.ad = questionAttributes.ad;
    this.correct = questionAttributes.correct;
    this.link = questionAttributes.link;
    Question.all.push(this);
  }

  // INDEX
  static fetchQuestions(gameId) {
    Question.all = [];
    fetch('http://localhost:3000/api/v1/questions')
    .then(response => response.json())
    .then(questions => {
      questions.data.forEach(question => {
        new Question(question, question.attributes);
      });
    })
    .then(() => {
      this.selectQuestions(gameId);
    })
    .catch(error => console.error(error));
  }

  static selectQuestions(gameId) {
    let allQuestions = Question.all;
    this.remainingQuestions = allQuestions.filter(el => el.game_id == gameId);
    this.renderQuestion();
  }

  static renderQuestion() {
    let question = this.remainingQuestions.shift();
    window.box_top_p.textContent = question.q;
    window.boxes.remove();
    App.renderBoxes();
    App.renderMiddleBox('a', ('A) ' + question.aa));
    window.box_a.addEventListener('click', e => {this.checkAnswer(question, 'a');});
    App.renderMiddleBox('b', ('B) ' + question.ab));
    window.box_b.addEventListener('click', e => {this.checkAnswer(question, 'b');});
    App.renderMiddleBox('c', ('C) ' + question.ac));
    window.box_c.addEventListener('click', e => {this.checkAnswer(question, 'c');});
    App.renderMiddleBox('d', ('D) ' + question.ad));
    window.box_d.addEventListener('click', e => {this.checkAnswer(question, 'd');});
  }

  static checkAnswer(question, answerId) {
    if(question.correct == answerId) {
      App.renderMiddleBox('correct', 'CORRECT!');
      window.box_correct.classList.add('correct');
      this.renderSource(question);
      Game.calculateScore('correct');
    } else {
      App.renderMiddleBox('incorrect', `INCORRECT. Correct answer: ${question.correct.toUpperCase()}`);
      window.box_incorrect.classList.add('incorrect');
      this.renderSource(question);
      Game.calculateScore('incorrect');
    }
  }

  static renderSource(question) {
    let boxSource = document.createElement('div');
    boxSource.setAttribute('class', 'box-middle');
    let boxSourceP = document.createElement('p');
    boxSource.append(boxSourceP);
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = `${question.link}`;
    a.innerText = `Source: ${question.link}`;
    boxSourceP.appendChild(a);
    window.boxes.append(boxSource);
    if(this.remainingQuestions.length > 0) {
      this.renderNext();
    } else {
      this.renderGetScore();
    }
  }

  static renderNext() {
    App.renderMiddleBox('next', 'Next');
    window.box_next.addEventListener('click', e => {this.renderQuestion();});
  }

  static renderGetScore() {
    App.renderMiddleBox('game_over', 'GAME OVER');
    window.box_game_over.classList.add('incorrect');
    App.renderMiddleBox('get_score', 'Get Score');
    window.box_get_score.addEventListener('click', e => {Game.renderScore();});
  }

  // NEW
  static renderNewForm(newGame) {
    window.boxes.remove();
    App.renderBoxes();
    let f = document.createElement('form');
    f.setAttribute('id', 'new_question_form');

    this.questionNumber ++;

    let question = document.createElement('input');
    App.setAttributes(question, {
      'id': `input_question_${this.questionNumber}`,
      'class': 'box-middle',
      'type': 'text', 
      'name': `input_question_${this.questionNumber}`});
    let br = document.createElement('br');
    let questionLabel = document.createElement('label');
    questionLabel.htmlFor = `input_question_${this.questionNumber}`;
    let desc = document.createTextNode(`Question ${this.questionNumber}`);
    questionLabel.append(desc);

    f.append(br, questionLabel, question);

    let answerLetters = ['A', 'B', 'C', 'D'];
    answerLetters.forEach(answerLetter => {

      let answer = document.createElement('input');
      App.setAttributes(answer, {
        'id': `${question.name}_${answerLetter}`,
        'class': 'box-middle',
        'type': 'text', 
        'name': `${question.name}_${answerLetter}`});
      let answerLabel = document.createElement('label');
      answerLabel.htmlFor = `${question.name}_${answerLetter}`;
      let desc = document.createTextNode(`Answer ${answerLetter}`);
      answerLabel.append(desc);
      f.append(br, answerLabel, answer);
    });

    let correctLabel = document.createElement('label');
    let correctDesc = document.createTextNode('What is the letter of the correct answer?');
    correctLabel.append(correctDesc);
    f.append(br, correctLabel, br);

    answerLetters.forEach(answerLetter => {
      let label = document.createElement('label');
      let correctButton = document.createElement('input');

      App.setAttributes(correctButton, {
        'id': `${question.name}_correct`,
        'type': 'radio',
        'name': `${question.name}_correct`,
        'value': answerLetter,
      });
      label.appendChild(correctButton);
      label.innerHTML += answerLetter;
      label.innerHTML += `<br><br>`;
      f.append(label);
    });

    let linkLabel = document.createElement('label');
    let linkDesc = document.createTextNode('What is a link that documents the correct answer?');
    linkLabel.append(linkDesc);
    f.append(br, linkLabel, br);

    let link = document.createElement('input');
    App.setAttributes(link, {
      'id': `${question.name}_link`,
      'class': 'box-middle',
      'type': 'text', 
      'name': `${question.name}_link`
    });
    f.append(link);

    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Next'
    });
    f.append(is);

    f.addEventListener('submit', e => { this.handleCreateForm(e, newGame);});
    boxes.appendChild(f);
  }

  // TODO NEXT: Add validations.
  // CREATE
  static handleCreateForm(e, newGame) {
    e.preventDefault();
    let questionInputId = `input_question_${this.questionNumber}`;
    let questionInput = document.getElementById(questionInputId).value;
    let questionInputAId = `input_question_${this.questionNumber}_A`;
    let questionInputA = document.getElementById(questionInputAId).value;
    let questionInputBId = `input_question_${this.questionNumber}_B`;
    let questionInputB = document.getElementById(questionInputBId).value;
    let questionInputCId = `input_question_${this.questionNumber}_C`;
    let questionInputC = document.getElementById(questionInputCId).value;
    let questionInputDId = `input_question_${this.questionNumber}_D`;
    let questionInputD = document.getElementById(questionInputDId).value;
    let questionInputCorrectId = `input_question_${this.questionNumber}_correct`;
    let questionInputCorrect = document.getElementById(questionInputCorrectId).value.toLowerCase();
    let questionInputLinkId = `input_question_${this.questionNumber}_link`;
    let questionInputLink = document.getElementById(questionInputLinkId).value;
    this.postQuestion(questionInput, questionInputA, questionInputB, questionInputC, questionInputD, questionInputCorrect, questionInputLink, newGame);
  }

  static postQuestion(q, aa, ab, ac, ad, correct, link, newGame) {
    let game_id = newGame.id;
    let bodyData = {question: {q, aa, ab, ac, ad, correct, link, game_id}};
    fetch("http://localhost:3000/api/v1/questions", {
      method: "POST",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(question => {
          let questionData = question.data;
          let newQuestion = new Question(questionData, questionData.attributes);
          if (this.questionNumber < 5) {
            this.renderNewForm(newGame);
          } else {
            Game.renderUpdateForm(newGame);
          }
        });
      } else {
        response.json()
        .then(errors => {
          errors.errors.forEach(error => {
            window.alert(error);
          });
        });
      }
    })
    .catch(error => console.error('Error:', error));
  }

  // EDIT
  static selectUpdateQuestions(gameId) {
    let allQuestions = Question.all;
    this.remainingQuestions = allQuestions.filter(el => el.game_id == gameId);
    this.renderUpdateForm();
  }

  static renderUpdateForm() {
    window.boxes.remove();
    App.renderBoxes();
    let f = document.createElement('form');
    f.setAttribute('id', 'update_question_form');
    
    let thisQuestion = this.remainingQuestions.shift();    
    this.questionNumber ++;

    // Question
    let lq = document.createElement('label');
    lq.textContent = `Question ${this.questionNumber}`;
    let iq = document.createElement('input');
    App.setAttributes(iq, {
      'id': `question`,
      'class': 'box-middle',
      'type': 'text', 
      'name': `question`, 
      'value': `${thisQuestion.q}`
    });
    let br = document.createElement('br');

    f.append(br, lq, iq);

    // Answers
    let answerLetters = ['A', 'B', 'C', 'D'];
    answerLetters.forEach(answerLetter => {
      let la = document.createElement('label');
      la.textContent = `Answer ${answerLetter}`;
      let answer = document.createElement('input');
      let val = eval(`thisQuestion.a${answerLetter.toLowerCase()}`);
      App.setAttributes(answer, {
        'id': `${answerLetter}`,
        'class': 'box-middle',
        'type': 'text', 
        'name': `${answerLetter}`, 
        'value': `${val}`
      });
      f.append(la, answer);
    });

    // Correct
    let lc = document.createElement('label');
    lc.textContent = `Letter of correct answer`;
    let correct = document.createElement('input');
    App.setAttributes(correct, {
      'id': `correct`,
      'class': 'box-middle',
      'type': 'text', 
      'name': `correct`, 
      'value': `${thisQuestion.correct}`
    });
    f.append(lc, correct);

    // Link

    let link = document.createElement('input');
    App.setAttributes(link, {
      'id': `link`,
      'class': 'box-middle',
      'type': 'text', 
      'name': `link`, 
      'value': `${thisQuestion.link}`
    });

    let ll = document.createElement('label');
    ll.htmlFor = link;
    ll.textContent = 'What is a link that documents the correct answer?';

    f.append(ll, link);

    // Submit
    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Next'
    });
    f.append(is);
    f.addEventListener('submit', e => { this.handleUpdateForm(e, thisQuestion.game_id, thisQuestion.id);});
    boxes.appendChild(f);
  }

  // UPDATE
  static handleUpdateForm(e, gameId, questionId) {
    e.preventDefault();
    let questionInput = window.question.value;
    let aInput = window.A.value;
    let bInput = window.B.value;
    let cInput = window.C.value;
    let dInput = window.D.value;
    let correctInput = window.correct.value;
    let linkInput = window.link.value;

    this.updateQuestion(gameId, questionId, questionInput, aInput, bInput, cInput, dInput, correctInput, linkInput);
  }

  static updateQuestion(gameId, question_id, q, aa, ab, ac, ad, correct, link) {
    const bodyData = {question: {q, aa, ab, ac, ad, correct, link}};
    fetch(`http://localhost:3000/api/v1/questions/${question_id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(question => {
          let questionData = question.data;
          let newQuestion = new Question(questionData, questionData.attributes);
          if (this.questionNumber < 5) {
            this.renderUpdateForm(newQuestion);
          } else {
            Game.markGameComplete(gameId, true);
          }
        });
      } else {
        response.json()
        .then(errors => {
          errors.errors.forEach(error => {
            window.alert(error);
          });
        });
      }
    })
    .catch(error => console.error('Error:', error));
  }
}

Question.all = [];
Question.remainingQuestions = [];
Question.questionNumber = 0;