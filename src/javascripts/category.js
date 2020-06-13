class Category {

  constructor(category, categoryAttributes) {
    this.id = category.id;
    this.name =categoryAttributes.name;
    Category.all.push(this);
  }

  // INDEX
  static renderCategories() {
    document.querySelector('#box-top-p').textContent = 'Q: What category of game do you want to play?';
    document.querySelector('#box-a').style.display = 'none';
    document.querySelector('#box-b').style.display = 'none';

    fetch('http://localhost:3000/api/v1/categories')
    .then(response => response.json())
    .then(categories => {
      categories.data.forEach(category => {
        let newCategory = new Category(category, category.attributes);
        let div = document.createElement('div');
        div.className = "box-middle";
        div.innerHTML = `<p>${newCategory.name}</p>`;
        div.addEventListener('click', e => console.log(`${newCategory.name} clicked`))
        document.querySelector('#boxes').appendChild(div);
      });
    });
  }
}

Category.all = [];