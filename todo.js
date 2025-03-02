let todocontainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("todoButton");
let savetodobutton = document.getElementById("saveTodobutton");

function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList= JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
    
}

let todoList = getTodoListFromLocalStorage();

addTodoButton.onclick=function(){
    addAddTodo();
}

function onTodoStatusChange(checkboxId,labelId,todoID){
    let checkboxelement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex =todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoID){
            return true;
        }else{
            return false;
        }
    });
    let todoObject=todoList[todoObjectIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked=false;
    }else{
        todoObject.isChecked=true;
    }
}
function onDeleteTodo(todoID){
    let todoElement=document.getElementById(todoID);
    todocontainer.removeChild(todoElement);
    let deleteindex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+ eachTodo.uniqueNo;
        if(eachTodoId===todoID){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteindex,1);
    console.log(todoList);
}

function createAndAppendtodo(todo) {
    let checkboxId="checkbox" +todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoID= "todo"+todo.uniqueNo;


    let todoElement = document.createElement('li');
    todoElement.id= todoID;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todocontainer.appendChild(todoElement);
    

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked=todo.isChecked;
    inputElement.onclick=function(){
        onTodoStatusChange(checkboxId,labelId,todoID);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    
    let deleteiconcontainer=document.createElement("div");
    deleteiconcontainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteiconcontainer);
    
    let deleteicon=document.createElement("i");
    deleteicon.onclick=function(){
        onDeleteTodo(todoID);
    }
    deleteicon.classList.add("far","fa-trash-alt","delete-icon");
    deleteiconcontainer.appendChild(deleteicon);
}
function addAddTodo(){
    let todosCount=todoList.length;
    todosCount= todosCount+1;

    UserInput=document.getElementById("todoUserInput");
    let userInputValue=UserInput.value;
    if(userInputValue===""){
        alert("Enter Valid text");
        return;
    }


    let newTodo={
        text:userInputValue,
        uniqueNo:todosCount,
        isChecked:false
    };
    todoList.push(newTodo)
    createAndAppendtodo(newTodo);
    UserInput.value="";
}
savetodobutton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
for (let eachTodo of todoList) {
    createAndAppendtodo(eachTodo);
}