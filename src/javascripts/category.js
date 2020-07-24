class Category {

  constructor(category, categoryAttributes) {
    this.id = category.id;
    this.name =categoryAttributes.name;
    Category.all.push(this);
  }

  // INDEX
  static renderCategories() {
    if(window.hero) {
      window.hero.remove();
    }
    window.boxes.remove();
    window.button_home.style.display = 'block';
    window.box_top_p.textContent = 'Q: What category of game do you want to play?';
    App.renderBoxes();

    fetch('http://localhost:3000/api/v1/categories')
    .then(response => response.json())
    .then(categories => {
      categories.data.forEach(category => {
        let newCategory = new Category(category, category.attributes);
        App.renderMiddleBox(newCategory.id, newCategory.name);
        let categoryId = `box_${newCategory.id}`;
        document.getElementById(categoryId).addEventListener('click', e => Game.renderGames(newCategory.id));
      });
    });
  }
}

Category.all = [];