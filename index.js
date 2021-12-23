const addBtn = document.getElementById("add-btn");
const addTitle = document.getElementById("note-title");
const addText = document.getElementById("note-text");

addBtn.addEventListener("click" , function(e){
    e.preventDefault();

    if(addTitle.value == '' || addText.value == ''){
        alert('please add a note title and note text!');
    } else {
        addToLs();
        addText.value = "";
        addTitle.value = "";
        showNotes();
    }
});


function addToLs () {
    if(localStorage.getItem("notes") == null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"))
    }

    let myObj = {
        title: addTitle.value,
        text: addText.value
    }

    notes.push(myObj);
    localStorage.setItem("notes" , JSON.stringify(notes));
}

function showNotes(){
    if(localStorage.getItem("notes") == null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"))
    }

    let format = '';
       notes.forEach(function(element,index) {
        format += `<div class="note">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p> 
        <button id="${index}" class="delete-btn" onclick="deleteNote(this.id)">Delete Note</button>
        <button id="${index}" class="edit-btn" onclick="editNote(this.id)">Edit Note</button>
        </div>`;
       });

       let noteEl = document.getElementById("notes");
       if(notes.length != 0){
           noteEl.innerHTML = format
       } else{
           noteEl.innerHTML = `Please add a note title and text!`
       }
       
}

function deleteNote(index){
    let confirmDel = confirm("Do you want to delete this note?");
    if(confirmDel == true){
        if(localStorage.getItem("notes") == null){
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem("notes"))
        }

        notes.splice(index,1);
        localStorage.setItem("notes" , JSON.stringify(notes));
        showNotes();
    }
}

function editNote(index){
    if (addTitle.value !== '' || addText.value !== ''){
        alert("clear note title and note text in the form above before editig!")
    }else{
        if(localStorage.getItem("notes") == null){
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem("notes"))
        }
        let title = notes[index].title;
        let text = notes[index].text;
        // console.log(title)
        // console.log(text)
        // console.log(index)
        addTitle.value = title;
        addText.value = text;
    
        notes.splice(index , 1);
        localStorage.setItem("notes" , JSON.stringify(notes));
        showNotes();
    }
}

showNotes();