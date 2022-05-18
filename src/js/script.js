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
      const bookElem = dataSource.books[book];
      const bookRating = bookElem.rating;
      const ratingBgc = determineRatingBgc(bookRating);
      const ratingWidth = 10 * bookRating;
      const data = Object.assign({ ratingWidth, ratingBgc }, dataSource.books[book]);

      const generatedHTML = templates.menuBooks(data);
      const element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(element);
    }
  }

  function filterBooks(){
    const bookLinks = document.querySelectorAll(select.all.bookImages);
    for (const bookId in dataSource.books){
      let shouldBeHidden = false;
      const book = dataSource.books[bookId];
      for (const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }    
      for (const bookLink of bookLinks){
        const id = bookLink.getAttribute('data-id');
        console.log('bookLink id: ' , id , 'book dataSource id:' , book.id , 'shouldBeHidden: ' , shouldBeHidden);
        if (shouldBeHidden === true && id == book.id){
          bookLink.classList.add('hidden');
        } else if (shouldBeHidden === false && id == book.id){
          bookLink.classList.remove('hidden');
        }
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

  function determineRatingBgc(rating){
    let background = '';
    if (rating<6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  render();
  initActions();
}