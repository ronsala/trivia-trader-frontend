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
      let gameQuestions = allQuestions.filter(el => el.game_id == gameId);

      gameQuestions.forEach(question => {
        this.renderQuestion(question);
        // App.renderMiddleBox(question.id, question.title);
        // let questionId = `box_${question.id}`;
        // document.getElementById(questionId).addEventListener('click', e => console.log(`${question.title} clicked`));
      });
    })
    .catch(error => console.error(error));
  }

  static renderQuestion(question) {
    window.box_top_p.textContent = question.q;
    window.boxes.remove();
    App.renderBoxes();
    App.renderMiddleBox('a', question.aa);
    window.box_a.addEventListener('click', e => {this.checkAnswer('a');});
    App.renderMiddleBox('b', question.ab);
    window.box_b.addEventListener('click', e => {this.checkAnswer('b');});
    App.renderMiddleBox('c', question.ac);
    window.box_c.addEventListener('click', e => {this.checkAnswer('c');});
    App.renderMiddleBox('d', question.ad);
    window.box_d.addEventListener('click', e => {this.checkAnswer('d');});
  }

  static checkAnswer(answerId) {
    console.log('in checkAnswer()')
  }
}

Question.all = [];