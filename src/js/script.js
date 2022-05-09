/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    containerOf: {
      books: '.books-list',
    },
    all: {
      menuBooks: '.books-list > .book',
      bookImages: '.books-list > .book__image'
    },
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };



  function render(){
    for (const book in dataSource.books){
      const generatedHTML = templates.menuBooks(dataSource.books[book]);        //ciągle tego nie kumam
      this.element = utils.createDOMFromHTML(generatedHTML);            // co to jest to this.element
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(this.element);
    }
  }

  let favoriteBooks = [];

  function initActions(){ // nie działa
    const bookImages = document.querySelectorAll(select.all.bookImages);
    for (const book of bookImages){
      book.addEventListener('dblclick' , function (event){
        event.preventDefault();
        book.classList.add('favorite');
        const id = book.data.id;
        favoriteBooks.push(id);
      });
    }
  }

  render();
  initActions();
  console.log(favoriteBooks);
}