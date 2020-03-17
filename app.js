$(document).foundation();
let myLibrary= JSON.parse(localStorage.getItem("library")) || 

[{title:"The Fellowhip Of The Ring",author:"J.R.Tolkien",pages:"423",year:"1954",isRead:true},
{title:"The Two Towers",author:"J.R.Tolkien",pages:"352",year:"1954",isRead:false},
{title:"The Return Of The King",author:"J.R.Tolkien",pages:"416",year:"1955",isRead:false}];

localStorage.setItem("library",JSON.stringify(myLibrary));
function Book(title,author,pages,year,isRead){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.year=year;
    this.isRead=isRead;
}
Book.prototype.info=function(){
  return this.title+' by '+this.author+' , '+this.pages+" "+this.isRead
}



function addBookToLibrary(title,author,pages,year,isRead){
    let book= new Book(title,author,pages,year,isRead);
    myLibrary.push(book);
    localStorage.setItem("library",JSON.stringify(myLibrary));
}

function formSubmit(){
    console.log("Form Submitted");
    addBookToLibrary(form.title.value,form.author.value,form.pages.value,form.year.value,form.isRead.checked);
    update();
}

function addCard(book){
    cardContainer.innerHTML+=`<div class="cell small-12 medium-6 large-3 card" data-closable>
    <div class="card-divider align-middle" style="position: relative">
        ${book.author}
        <input type="checkbox" name="isRead" id="isReadButton" ${book.isRead?"checked":""}>
        <label for="isReadButton">Read</label>
        <i class="fa fa-gear"></i>
        <button class="close-button" aria-label="Close alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="card-section">
        <h4>${book.title}</h4>
        <p>${book.pages} Pages</p>
        <p>Published in ${book.year}</p>
        </div>
    </div>`;
    
}

function render(){
    myLibrary.forEach((book)=>{
        addCard(book);
        addBtnListeners();
    })
}

function update(){
    let book=myLibrary[myLibrary.length-1];
    addCard(book);
    addBtnListeners();
    }

   

function addBtnListeners(){
    let removeButtons=document.querySelectorAll(".close-button");
    removeButtons.forEach((button,index)=>{
            button.addEventListener("click",(e)=>{
                let removeTitle=e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent;
                myLibrary.forEach((book,index,self)=>{
                    if(book.title!==removeTitle) return book
                    else self.splice(index,1)
    
                });
                console.table(myLibrary);
                localStorage.setItem("library",JSON.stringify(myLibrary));
            })
        })
    let editButtons=document.querySelectorAll(".fa-gear");
    editButtons.forEach(button=>button.classList.remove("disabled"));
    editButtons.forEach((button,index)=>{
        button.addEventListener("click",(e)=>{
            editButtons.forEach(button=>button.classList.add("disabled")); 
            let book=myLibrary.find(book=>{
                return book.title===e.target.parentElement.nextElementSibling.firstElementChild.textContent;
            })
            console.log(book);
            e.target.parentElement.parentElement.innerHTML=`
            <div class="grid-container">
            <form autocomplete="off" onSubmit='return false' class="form-edit">
            <div class="grid-x grid-padding-x align-middle align-center form-grid">
            <div class="small-12 medium-10  cell">
              <label>Title
                <input type="text" value='${book.title}' name="title" placeholder="Book Title" required>
              </label>
            </div>
            <div class="small-12 medium-10 cell">
              <label>Author
                <input type="text" value='${book.author}' name="author" placeholder="Book Author" required>
              </label>
            </div>
            <div class="small-4 cell  move">
              <label>Pages
                <input type="number" value='${book.pages}' name="pages" min="1" required>
              </label>
            </div>
            <div class="small-5 cell">
              <label>Year
                <input type="number" value='${book.year}' name="year" min="1" required>
              </label>
            </div>
            <div class="small-3 medium-2 cell move  text-left readField ">
            <fieldset style="display:flex; justify-content:center">
              <input type="checkbox" name="isRead" id="isReadButton" ${book.isRead?"checked":""}>
              <label for="isReadButton">Read</label>
            </fieldset>
            </div>
            <button type="submit" class="edit-save small-12 medium-8 large-6 button large submit-button">Save</button>
            </div>
          </form>
          </div>`;
          const editForm=document.querySelector(".form-edit");
          editForm.addEventListener('submit',(e)=>{
                book.title=editForm.title.value;
                book.author=editForm.author.value;
                book.pages=editForm.pages.value;
                book.year=editForm.year.value;
                book.isRead=editForm.isRead.checked;
                    console.table(myLibrary);
                    localStorage.setItem("library",JSON.stringify(myLibrary));
                e.target.parentElement.parentElement.innerHTML=`
                <div class="card-divider align-middle" style="position: relative">
                    ${book.author}
                    <input type="checkbox" name="isRead" id="isReadButton" ${book.isRead?"checked":""}><label for="isReadButton">Read</label>
                    <i class="fa fa-gear"></i>
                    <button class="close-button" aria-label="Close alert" type="button" data-close>
                    <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="card-section">
                    <h4>${book.title}</h4>
                    <p>${book.pages} Pages</p>
                    <p>Published in ${book.year}</p>
                    </div>
                `;
               
               
                addBtnListeners();
               
          })
         

        })
       
    })
    let readToggler=document.querySelectorAll("#isReadButton");
    readToggler.forEach(toggler=>toggler.addEventListener("change",(e)=>{
      console.log("Hello!")
      let book=myLibrary.find(book=>{
        return book.title===e.target.parentElement.nextElementSibling.firstElementChild.textContent;
    })
    book.isRead=!book.isRead;
    console.log(myLibrary)
    localStorage.setItem("library",JSON.stringify(myLibrary));
      
    }))

    }

    






const cardContainer=document.querySelector(".card-container");
const form=document.querySelector("form");
form.reset();
const dropdown=document.querySelector(".submit-button");
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    dropdown.setAttribute("data-toggle","example-dropdown");
    dropdown.click();
    formSubmit(); 
   

})

render();

