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

  let favoriteBooks = [];
  let filters = [];

  function render(){
    for (const book in dataSource.books){
      const generatedHTML = templates.menuBooks(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(element);
    }
  }

  function filterBooks(){
    const bookLink = document.querySelector(select.all.bookImages);
    const id = bookLink.getAttribute('data-id');
    console.log(id);
    for (const bookId in dataSource.books){
      let shouldBeHidden = false;
      const book = dataSource.books[bookId];
      for (const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden === true && id == book.id){
        bookLink.classList.add('hidden');
      } else {
        bookLink.classList.remove('hidden');
      }
    } 
  }
  
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
          filters.push(event.target.value);
        } else {
          const indexOfId = filters.indexOf(event.target.value);
          filters.splice(indexOfId, 1);
        }
      }
      filterBooks();
    });
  }

  render();
  initActions();
}