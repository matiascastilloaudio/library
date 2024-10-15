class Book {
    myLibrary = [];

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    addBookToLibrary() {
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
            formDialog.close(this.myLibrary.push(newBook));
            form.reset();
            this.displayBooks();
        });
    }

    displayBooks() {
        const bookContainer = document.querySelector('#bookContainer');
        bookContainer.innerHTML = '';
        for (let i = 0; i < this.myLibrary.length; i++) {

            const book = document.createElement('div');
            book.id = 'book';
            bookContainer.appendChild(book);

            const bookTitle = document.createElement('h3');
            bookTitle.textContent = this.myLibrary[i].title;
            book.appendChild(bookTitle);

            const bookAuthor = document.createElement('p');
            bookAuthor.textContent = `by ${this.myLibrary[i].author}`;
            book.appendChild(bookAuthor);

            const bookPages = document.createElement('p');
            bookPages.textContent = `${this.myLibrary[i].pages} pages`;
            book.appendChild(bookPages);

            const bookStatus = document.createElement('button');
            bookStatus.textContent = this.myLibrary[i].status;
            bookStatus.classList.add('statusBtn');
            bookStatus.classList.add(this.myLibrary[i].status === 'read' ? 'read' : 'not-read');
            book.appendChild(bookStatus);

            bookStatus.addEventListener('click', () => {
                this.changeStatus(bookStatus, this.myLibrary[i]);
            });

            const delBtn = document.createElement('button');
            delBtn.textContent = 'delete';
            delBtn.addEventListener('click', () => {
                this.myLibrary.splice(i, 1);
                this.displayBooks();
            });
            book.appendChild(delBtn);
        }
    }

    changeStatus(button, book) {
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
}

const myBookLibrary = new Book();
myBookLibrary.addBookToLibrary();