class Category {

  constructor(category, categoryAttributes) {
    this.id = category.id;
    this.name =categoryAttributes.name;
    Category.all.push(this);
  }

  // INDEX
  static renderCategories() {
    document.querySelector('#box-top-p').textContent = 'Q: What category of game do you want to play?';

    // fetch('http://localhost:3000/api/v1/categories')
    // .then(response => response.json())
    // .then(categories => {
    //   categories.data.forEach(category => {
    //     let newUser = new User(category, category.attributes);
    //     document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
    //   });
    // });
  }
}

Category.all = [];