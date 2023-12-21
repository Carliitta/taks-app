import React, { Fragment, useState ,useRef, useEffect } from 'react';
import './assets/tailwind.css';

type formElement=React.FormEvent<HTMLFormElement> // <--representa un evento de formulario en React

interface ITask{   //<--describe cómo se ve una tarea con su nombre y estado de completado.
  name:string;
  done:boolean;
}
function App() : JSX.Element{
  const [newTask, setNewTask] = useState<string>(""); //nueva tarea
  const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));// lee las tareas del localStorage y establece en el estado inicial.

  const taskInput = useRef<HTMLInputElement>(null); // referencia al campo de entrada en el formulario


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 

  const handleSubmit = (e: formElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {  // Toma el nombre de una tarea y la agrega a la lista de tareas actuales.
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
    // Guardar en el localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const toggleDoneTask = (i: number): void => { // se encarga de cambiar el estado de completado de una tarea en la posición i de la lista de tareas.
    const newTasks: ITask[] = [...tasks]; //se crea una copia nueva de la lista de tareas actual

    // Si newTasks[i].done es true (significa que la tarea estaba marcada como completada), 
    //entonces !newTasks[i].done lo cambiará a false (marcándola como no completada).
    // Y viceversa, si newTasks[i].done es false, entonces !newTasks[i].done lo cambiará a true
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
    // Guardar en el localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const removeTask = (): void => {
   
    setTasks([]);
     // Borrar del localStorage
     localStorage.removeItem('tasks');
  };
  return (
  <Fragment>
    <div className='card' style={{marginTop:'20px'}}>

      <h1 className='title'>Lista de tareas</h1>
    <form className='form' onSubmit={handleSubmit}  >
      <input className="input" ref={taskInput} placeholder='Que haremos hoy?' required autoFocus
       type="text" onChange={(e)=>setNewTask(e.target.value)} value={newTask} />
      <button className="btn btn-blue btn-blue:hover">Agregar</button>
    </form>
    <div className='card-list flex flex-1 justify-between ' hidden={!tasks.length }>
    {
      tasks.map((el,i:number)=>{
        return(
          
          <ul className='ul'>
            <li style={{textDecoration: el.done?'line-through' :''}} className="" key={i}>{el.name}</li>
            <button title='done' style={{background: !el.done?'' :'green'}}
             onClick={() => toggleDoneTask(i)} className="btn-delete">
            {el.done ? "✓" : "✗" }</button>
          
          </ul>
          )
        })
      }
      </div>
    </div>
      <div className='div-btn-clear'>
      <button hidden={tasks.length <3} onClick={() => removeTask()} className="btn-clear">Borrar todo</button> 

      </div>
  </Fragment>
  );
}

export default App;
