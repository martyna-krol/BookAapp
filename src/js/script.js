/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    containerOf: {
      books: '.books-list',
      form: '.filters',
    },
    all: {
      bookImages: '.books-list .book__image',
    },
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };



  function render(){
    for (const book in dataSource.books){
      const generatedHTML = templates.menuBooks(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(element);
    }
  }

  let favoriteBooks = [];
  let filters = [];
  
  function initActions(){
    const bookList = document.querySelector(select.containerOf.books);
    const filterForm = document.querySelector(select.containerOf.form);

    bookList.addEventListener('dblclick' , function (event){
      if (event.target.offsetParent.classList.contains('book__image')){
        const id = event.target.offsetParent.getAttribute('data-id');
        if (favoriteBooks.includes(id) === false) {
          event.preventDefault();
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(id);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          const indexOfId = favoriteBooks.indexOf(id);
          console.log(indexOfId);
          favoriteBooks.splice(indexOfId, 1);
        }
      } 
    });

    filterForm.addEventListener('change' , function (event){
      if (
        event.target.tagName == 'INPUT' && 
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'){
        if (event.target.checked == true){
          console.log(event.target.value);
          filters.push(event.target.value);
          console.log(filters);
        } else {
          console.log(event.target.value + ' odkliknięte!');
          const indexOfId = filters.indexOf(event.target.value);
          filters.splice(indexOfId, 1);
          console.log(filters);
        }
      }
    });
  }

  render();
  initActions();
}