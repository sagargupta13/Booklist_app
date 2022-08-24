class Book {
    constructor(t, a, is) {
        this.title = t
        this.author = a
        this.isbn = is
    }

}
class UI {
    static displayBooks(){
    const storeBooks = Store.getBooks()
    storeBooks.forEach((book)=>
        UI.addBookToList(book)
    )
    }


    static addBookToList(book) {

        const list = document.querySelector("#book-list")
        // console.log(list)
        const row = document.createElement("tr")// create an <tr> </tr> element
        row.innerHTML = `<td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td> <a href='#' class = 'btn btn-danger btn-sm delete' >X</a>  `
        list.appendChild(row)
    }

    // creating a class to clear all fields after entering 
    static clearAllfields() {

        document.querySelector("#title").value = ''
        document.querySelector("#author").value = ''
        document.querySelector("#isbn").value = ''
    }

    // Creating a class to show alert message
    static showAlert(msg, className) {

        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        const form = document.querySelector('#book-form')
        const container = document.querySelector('.container')
        container.insertBefore(div, form)
        setTimeout(function () {
            document.querySelector(".alert").remove()
        }, 3000)
    }
//   creating a function for delete the book 
static deleteBook(el){

    if(el.classList.contains("delete")){
        if(confirm("Are you sure you want to delete the book"))
        el.parentElement.parentElement.remove()
        
    }
}
}

class Store {
static getBooks(){
    let books;
    if(localStorage.getItem("books")===null){
        books=[]
    }
    else{
        books = JSON.parse(localStorage.getItem("books"))
    }
    return books;
}

static addBooks(book){
    const books = Store.getBooks();
    books.push(book)
    localStorage.setItem("books",JSON.stringify(books))
}

static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book,index)=>{
        if(book.isbn === isbn)
        books.splice(index,1);
    })
    localStorage.setItem('books',JSON.stringify(books));
}
}



let book = new Book("Title 1", 'Author one', 1234)
// Event: Display books
document.addEventListener('DOMContentLoaded',UI.displayBooks)
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value
    if (title == '' || author == '' || isbn == '') {

        UI.showAlert("Please fill all fields", 'danger')

    }
    else {
        const book = new Book(title, author, isbn)
        // console.log(book)
        UI.addBookToList(book)
        UI.clearAllfields()
        UI.showAlert("Book Added successfully", 'success')
        Store.addBooks(book)
    }
})
document.querySelector('#book-list').addEventListener("click", function (e) {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // show delete alert msg
    UI.showAlert('Book Deleted Successfully', 'success');
})