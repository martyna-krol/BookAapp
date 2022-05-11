/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    containerOf: {
      books: '.books-list',
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
      const generatedHTML = templates.menuBooks(dataSource.books[book]);        //ciągle tego nie kumam
      this.element = utils.createDOMFromHTML(generatedHTML);            // co to jest to this.element
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(this.element);
    }
  }

  let favoriteBooks = [];
  
  function initActions(){
    const bookImages = document.querySelectorAll(select.all.bookImages);
    for (const book of bookImages){
      const id = book.getAttribute('data-id');
      book.addEventListener('dblclick' , function (event){
        if (favoriteBooks.includes(id) === false) {
          event.preventDefault();
          book.classList.add('favorite');
          favoriteBooks.push(id);
        } else {
          book.classList.remove('favorite');
          const indexOfId = favoriteBooks.indexOf(id);
          console.log(indexOfId);
          favoriteBooks.splice(indexOfId, 1);
        }
      });
      
    }    
  }

  render();
  initActions();
  console.log(favoriteBooks);
}