const reload = document.getElementById("reload");
const clock = document.getElementById("clock");
const  todolist = document.getElementById("todolist");
const task = document.getElementById("task-input");

//clasess of icons
const CHECK = "fa-check-square";
const UNCHECK = "fa-square";
const CROSSLINE = "lineThrough";

//Variables
let list,id;

//localstorage
let data = localStorage.getItem("TODO");

    if(data){
        list = JSON.parse(data);
        id = list.length;
        loadList(list);
    } else {
        list = [];
        id = 0;
    }

function loadList (array){
    array.forEach(function(element) {
        addTask(element.name,element.id,element.done,element.trash);
    });
}

reload.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});
// date and clock
const format = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const date = new Date();

clock.innerHTML = date.toLocaleDateString("en-US",format);
function odliczanie()
	{
		var dzisiaj = new Date();
		
		var godzina = dzisiaj.getHours();
		if (godzina<10) godzina = "0"+godzina;
		
		var minuta = dzisiaj.getMinutes();
		if (minuta<10) minuta = "0"+minuta;
		
		var sekunda = dzisiaj.getSeconds();
		if (sekunda<10) sekunda = "0"+sekunda;
		
		document.getElementById("zegar").innerHTML = godzina+":"+minuta+":"+sekunda;
		 
		 setTimeout("odliczanie()",1000);
	}




//add task function 
function addTask(task,id,done, trash){
    if(trash){return;}

    const DONE = done? CHECK : UNCHECK;
    const LINE = done? CROSSLINE : "";

    const item = `<li class="task">
                         <i class="far ${DONE} co" job="complete" id =${id}></i>
                         <p class ="text ${LINE}">${task}</p>
                         <i class="fas fa-trash-alt de"  job="delete" id = ${id}></i>
                  </li>`;
    const position = "beforeend";

    todolist.insertAdjacentHTML(position,item);
    
};

//add new task when user press enter

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const todo = task.value;
        if(todo){
            addTask(todo,id,false,false);

            list.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(list));
            id++;
        }
        task.value = "";
    }
});

function completedTask(el) {
    el.classList.toggle('fa-check-square');
    el.classList.toggle('fa-square');
    el.parentNode.querySelector(".text").classList.toggle(CROSSLINE);

    list[el.id].done = !list[el.id].done;
}

function removeTask (el){
    el.parentNode.parentNode.removeChild(el.parentNode);

    list[el.id].trash = true;
}

todolist.addEventListener("click", function(event){
    const element = event.target;
    const elemJob = element.attributes.job.value;

    if(elemJob == "complete"){
        completedTask(element);
    } else if( elemJob == "delete"){
        removeTask(element);
    }
    localStorage.setItem("TODO", JSON.stringify(list));
});