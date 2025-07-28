let globalid = 0;
let todo = [];
Load();

function Load()
{
  const taskscon = document.getElementById("tasks-container");

  const localSTR = localStorage.getItem("Todo");
  todo = JSON.parse(localSTR);

  if (todo != null)
  {
    todo.forEach((e) =>
    {
        let newdiv = document.createElement("div");
        newdiv.classList.add("tasks");
        newdiv.id = e.id;
        if (e.complete)
        {
          newdiv.innerHTML = `<div>
                        <i style="color: green" class="fa-solid fa-file-circle-check file"></i>
                        <strike style="color: green">
                            <p class="task-para">${e.input}</p>
                        </strike>
                    </div>
                    <div class="task-btns">
                        <i style="color: green" class="fa-solid fa-circle-check tick"></i>
                        <i class="fa-solid fa-trash trash"></i>
                    </div>`
        }
        else
        {
          newdiv.innerHTML = ` <div>
                   <i class="fa-solid fa-file-circle-check file"></i>
                        <p class="task-para">${e.input}</p>
                    </div>
                    <div class="task-btns">
                        <i class="fa-solid fa-circle-check tick"></i>
                        <i class="fa-solid fa-trash trash"></i>
                    </div>`
        }

        taskscon.append(newdiv);
        const taskcount=document.getElementById("count-text");
        taskcount.innerHTML=`Total Task:${todo.length}`
        globalid=todo.length;

      }


    );
  }
  else
  {
    if(taskscon.childElementCount>0)
    {
      taskscon.innerHTML="";
      const taskcount=document.getElementById("count-text");
      taskcount.innerHTML=`Total Task:0`
      globalid=0;
    }
  }
}

const addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", () =>
{
  const input = document.getElementById("input");
  if (input.value === "")
  {
    alert("Task Cant Be Empty");
  }
  else
  {
    if(todo==null)
      todo=[];
     globalid++;
    let check=false;
    if(todo!=[])
    {
      
      do{
      for(let i=0;i<todo.length;++i)
      {
        if(todo[i].id==globalid)
        {
          globalid++;
          check=true;
          break;
        }
        else
        {
          check=false;
        }
      }
     }while(check==true)
    }
    todo.push(new todoObj(input.value, false, globalid));
    localStorage.clear();
    const todoSTR = JSON.stringify(todo);
    localStorage.setItem("Todo", todoSTR);

    const taskscon = document.getElementById("tasks-container");

    let newdiv = document.createElement("div");
    newdiv.classList.add("tasks");
    newdiv.id = globalid;
    newdiv.innerHTML = ` <div>
                   <i class="fa-solid fa-file-circle-check file"></i>
                        <p class="task-para">${input.value}</p>
                    </div>
                    <div class="task-btns">
                        <i class="fa-solid fa-circle-check tick"></i>
                        <i class="fa-solid fa-trash trash"></i>
                    </div>`;
    taskscon.appendChild(newdiv);
     const taskcount=document.getElementById("count-text");
    taskcount.innerHTML=`Total Task:${todo.length}`

    input.value = "";
  }
});

let task_click = document.getElementById("tasks-container");
task_click.addEventListener("click", (e) =>
{
  if ((e.target.classList.contains("trash")))
  {
    Dindex = null;
    todo.forEach((element, index) =>
    {
      if (element.id == e.target.parentNode.parentNode.id)
      {
        Dindex = index;
        e.target.parentNode.parentNode.remove();
      }

    });

    todo.splice(Dindex, 1);
    const todoSTR = JSON.stringify(todo);
    localStorage.setItem("Todo", todoSTR);
    const taskcount=document.getElementById("count-text");
    taskcount.innerHTML=`Total Task:${todo.length}`
  }
  
  if (e.target.classList.contains("tick"))
  {
    todo.forEach((element) =>
    {
      if (element.id == e.target.parentNode.parentNode.id)
      {
        if (element.complete == true)
        {
          element.complete = false;
          e.target.style.color = "";
          e.target.parentNode.parentNode.children[0].innerHTML = ` <i class="fa-solid fa-file-circle-check file"></i>
                        <p class="task-para">${element.input}</p>`;
        }
        else
        {
          element.complete = true;
          e.target.style.color = "green";
          
          e.target.parentNode.parentNode.children[0].innerHTML = `<i style="color: green" class="fa-solid fa-file-circle-check file"></i>
                        <strike style="color: green">
                            <p class="task-para">${element.input}</p>
                        </strike>`;
        }
      }
      const todoSTR = JSON.stringify(todo);
      localStorage.setItem("Todo", todoSTR);
    });
  }
});

const delbtn=document.getElementById("delbtn");
delbtn.addEventListener("click",()=>
{
  let isConfirm=confirm("Are you sure you want to delete all tasks!");
  if(isConfirm)
  {
  localStorage.clear();
  Load();
  }
}
);

function todoObj(input, complete, id)
{
  this.input = input;
  this.complete = complete;
  this.id = id;
}
