const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const newBookBtn = document.querySelector('#newBookBtn');
    const formDialog = document.querySelector('#formDialog');
    const form = document.querySelector('#form');
    const cancelBtn = document.querySelector('#cancelBtn');
    const addBookBtn = document.querySelector('#addBookBtn');

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const status = document.querySelector('#status');

    newBookBtn.addEventListener('click', () => {
        formDialog.showModal();
    });

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        formDialog.close();
        form.reset();
    });

    addBookBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const newBook = new Book(title.value, author.value, parseInt(pages.value), status.value);
        formDialog.close(myLibrary.push(newBook));
        form.reset();
        displayBooks();
    });
}

addBookToLibrary();

function displayBooks() {
    const bookContainer = document.querySelector('#bookContainer');
    bookContainer.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {

        const book = document.createElement('div');
        book.id = 'book';
        bookContainer.appendChild(book);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = myLibrary[i].title;
        book.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `by ${myLibrary[i].author}`;
        book.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `${myLibrary[i].pages} pages`;
        book.appendChild(bookPages);

        const bookStatus = document.createElement('button');
        bookStatus.textContent = myLibrary[i].status;
        bookStatus.classList.add('statusBtn');
        bookStatus.classList.add(myLibrary[i].status === 'read' ? 'read' : 'not-read');
        book.appendChild(bookStatus);

        bookStatus.addEventListener('click', () => {
            changeStatus(bookStatus, myLibrary[i]);
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        delBtn.addEventListener('click', () => {
            myLibrary.splice(i, 1);
            displayBooks();
        });
        book.appendChild(delBtn);
    }
}

function changeStatus(button, book) {
    if (book.status === 'read') {
        book.status = 'not-read';
        button.textContent = 'not-read';
        button.classList.remove('read');
        button.classList.add('not-read');
    } else {
        book.status = 'read';
        button.textContent = 'read';
        button.classList.remove('not-read');
        button.classList.add('read');
    }
}