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

    fetch('http://localhost:3000/api/v1/questions')
    .then(response => response.json())
    .then(questions => {
      questions.data.forEach(question => {
        new Question(question, question.attributes);
      });
    })
    .then(() => {
      let allQuestions = Question.all;
      this.remainingQuestions = allQuestions.filter(el => el.game_id == gameId);
      this.remainingQuestions.forEach(question => {
        this.renderQuestion(this.remainingQuestions);
      });
    })
    .catch(error => console.error(error));
  }

  static renderQuestion(remainingQuestions) {
    console.log('remainingQuestions: ', remainingQuestions)
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
    } else {
      App.renderMiddleBox('incorrect', `INCORRECT. Correct answer: ${question.correct.toUpperCase()}`);
      window.box_incorrect.classList.add('incorrect');
      this.renderSource(question);
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
    this.renderNext();
  }

  static renderNext() {
    App.renderMiddleBox('next', 'Next');
    window.box_next.addEventListener('click', e => {this.renderQuestion(this.remainingQuestions);});
  }
}

Question.all = [];
remainingQuestions = [];