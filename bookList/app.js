//Book constructor

function Book(title, author, isbn) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
}



//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {

    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class="delete">X</a></td>`;
    list.appendChild(row);
    const ui = new UI();
    ui.showAlert('book added', 'success');

}

//show alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //add className
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);

}

//delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {

        target.parentElement.parentElement.remove();
    }
}
UI.prototype.clearFields = function() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}



//event listeners

document.getElementById('book-form').addEventListener('submit', function(e) {
    //get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    //validate
    if (title === '' || author === '' || isbn === '') {
        //error alert 
        ui.showAlert('Please fill all the fields', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);

        //clear fields

        ui.clearFields();
    }


    e.preventDefault();
})

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('book removed', 'success');

    e.preventDefault();
})