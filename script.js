let myLibrary = [];
let index = 0;
const gridContainer = document.querySelector(".grid-container");
const bookForm = document.querySelector("#book-entry-form");
let inputTitle = bookForm.querySelector("#book-title");
let inputAuthor = bookForm.querySelector("#book-author");
let inputPage = bookForm.querySelector("#book-pages");
let inputReadStatus = bookForm.querySelector("#status");
const submitButton = document.querySelector("#submit-button");
const dialogBookEntry = document.querySelector("#book-entry-modal");
const readButton = document.querySelectorAll(".read-status");
const removeButton = document.querySelectorAll(".remove-button");
const openDialog = document.querySelector("#add-book");

let initialBook = new Book("The Overstory","Richard Powers",512,"no");
myLibrary.push(initialBook);
initialBook = new Book("Cloud Atlas","David Mitchell",528,"no");
myLibrary.push(initialBook);
initialBook = new Book("All the Light We Cannot See","Anthony Doerr",531,"yes");
myLibrary.push(initialBook);
initialBook = new Book("The Last Samurai ","Helen DeWitt",548,"no");
myLibrary.push(initialBook);
initialBook = new Book("The Amazing Adventures of Kavalier & Clay","Michael Chabon",639,"yes");
myLibrary.push(initialBook);
displayBooks();


submitButton.addEventListener("click",(event)=>{
    event.preventDefault();
    if (inputReadStatus.checked){
        inputReadStatus.value = "yes";
    }
    else
        inputReadStatus.value = "no"
    let newBook = new Book(inputTitle.value,inputAuthor.value,inputPage.value,inputReadStatus.value);
    myLibrary.push(newBook);
    bookForm.reset();
    dialogBookEntry.close();
    console.log(myLibrary);
    displayBooks();
    
});



readButton.forEach(button=>{
    button.addEventListener("click",()=>{
        if(button.textContent === "No")
        button.textContent = "Yes";
        else{
            button.textContent = "No"
        }
        button.classList.toggle("yes");
        button.classList.toggle("no");
    });

})


removeButton.forEach(rButton => {
    rButton.addEventListener("click",(event)=>{
        let cardElement = event.target.closest(".card");
        cardElement.parentNode.removeChild(cardElement);
    })
})


openDialog.addEventListener("click",()=> dialogBookEntry.showModal());



function Book(title,author,noPages,isRead)
{
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.isRead = isRead;
}

function displayBooks(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(eachCard){
        eachCard.remove();
    });
    myLibrary.forEach(function(book){
        let card = document.createElement("div");
        card.className = "card";
        let title = document.createElement("div");
        title.className = "title";
        title.textContent = book.title;
        let author = document.createElement("div");
        author.className = "author";
        author.textContent = book.author;
        let pages = document.createElement("div");
        pages.className = "pages";
        pages.textContent = book.noPages;
        let read = document.createElement("div");
        read.className = "read";
        let readQuestion = document.createElement("div");
        readQuestion.className = "read-question";
        readQuestion.textContent = "Have I read this?";
        let readButton = document.createElement("button");
        readButton.type = "button";
        readButton.className = "read-status";
        if(book.isRead === "yes"){
            readButton.classList.add("yes");
            readButton.textContent = "Yes";
        }
        else{
            readButton.classList.add("no"); 
            readButton.textContent = "No";
        }
        readButton.addEventListener("click",()=>{
            if(readButton.textContent === "No"){
                readButton.textContent = "Yes";
                book.isRead = "yes"
            }
            else{
                readButton.textContent = "No"
                book.isRead = "no"
            }
            readButton.classList.toggle("yes");
            readButton.classList.toggle("no");
        });
        read.appendChild(readQuestion);
        read.appendChild(readButton);
        let removeSection = document.createElement("div");
        removeSection.className = "remove-section";
        let removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click",(event)=>{
            let cardElement = event.target.closest(".card");
            cardElement.parentNode.removeChild(cardElement);
            let index=myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
        });
        removeSection.appendChild(removeButton);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeSection);
        gridContainer.appendChild(card);


    })
}