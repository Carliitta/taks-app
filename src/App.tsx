import React, { Fragment, useState ,useRef } from 'react';
import './assets/tailwind.css';

type formElement=React.FormEvent<HTMLFormElement>

interface ITask{
  name:string;
  done:boolean;
}
function App() : JSX.Element{
  const [newTask, setNewTask] = useState<string>(""); //nueva tarea
  const [tasks, setTasks] = useState<ITask[]>([]);  //tareas
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: formElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
  <Fragment>
    <div className="card">

      <h1 className='title'>TO DO LIST</h1>
    <form className='form' onSubmit={handleSubmit}  >
      <input className="input" ref={taskInput}  required autoFocus
       type="text" onChange={(e)=>setNewTask(e.target.value)} value={newTask} />
      <button className="btn btn-blue btn-blue:hover">Add</button>
    </form>
    {
      tasks.map((el,i:number)=>{
        return(
          <ul className='ul'>
            <li style={{textDecoration: el.done?'line-through' :''}} className="" key={i}>{el.name}</li>
            <button style={{background: !el.done?'' :'green'}}
             onClick={() => toggleDoneTask(i)} className="btn-delete">
            {el.done ? "✓" : "✗" }</button>
            <button
                      onClick={() => removeTask(i)}
                      className="btn-basura"
                    >
                      🗑️
                    </button>
          </ul>
          
        )
      })
    }
    
    </div>
  </Fragment>
  );
}

export default App;
