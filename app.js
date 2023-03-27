const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const tasksList = document.querySelector("#tasks");
const clear = document.querySelector(".clear");
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const task = document.querySelector("#tasks");
// const calcInput = document.querySelectorAll("input[type='button'");

//empty array to store the task
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    
};


getDataFromLocalstorage();

//Add task
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if(todoInput.value === "") {
        alert("Please enter a task");
    }else {
        addTask(todoInput.value);
        todoInput.value = ""; //empty The Input
        clear.style.display = "block";
    }

});


tasksList.addEventListener("click" , (e) => {
    //Delete Button
    if (e.target.classList.contains("del")) {
        //Remove Task from Local Storge
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove Element From Page
        e.target.parentElement.remove();        
    }
     //Task Element
     if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //Toggle Done Class
        e.target.classList.toggle("done");   
     }
});



function addTask(taskText) {
    //task data
    const task = {
        id: Date.now(),
        title:taskText,
        completed: false, 
    };
    //Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    //Add Task To Page
    addElementToPage(arrayOfTasks);
    //add task to localstorge
    addToLocalstorage(arrayOfTasks);
}


function addElementToPage(arrayOfTasks) {
    tasksList.innerHTML = "";
    //Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done
        if(task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));
        //Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks List
        tasksList.appendChild(div);
        
    });
    
};

function addToLocalstorage(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
};

function getDataFromLocalstorage() {
   let data = window.localStorage.getItem("tasks");
   if(data){
    let tasks = JSON.parse(data);
    addElementToPage(tasks);
   }
};

function deleteTaskWith(taskId) {
    // for (let i = 0; i < arrayOfTasks.length ; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addToLocalstorage(arrayOfTasks);
};

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length ; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addToLocalstorage(arrayOfTasks);
};

// clear all button

    clear.addEventListener("click" ,() =>{
        window.localStorage.removeItem("tasks");
        tasksList.innerHTML = ""; 
        arrayOfTasks =[];
        clear.style.display = "none";
             
    });

    mode.addEventListener("click" , () => {
    
        body.classList.toggle("body-mode");
        task.classList.toggle("list-mode");
        });
 



