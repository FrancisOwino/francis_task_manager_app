import React, { useState } from 'react'
import {TiDelete, TiEdit} from 'react-icons/ti'

const App = () => {

    const [task, settask] = useState("")
    const [list_of_tasks, setList_of_tasks] = useState([])
    const [editID, seteditID] = useState(-1)

    const handleSubmit = (e) =>{
      e.preventDefault()
      const newList = {
        id: Date.now(),
        name: task
      }
      setList_of_tasks([...list_of_tasks, newList])
      settask("")

    }


    const handleDelete = (id) =>{
      setList_of_tasks(list_of_tasks.filter((task)=>task.id !== id))
    }

    const handleEdit = (id) =>{
      seteditID(id)

    }



    const handleInputchange = (e, task) =>{
      const newList = list_of_tasks.map((li)=> li.id === task.id ? 
      {...li, name: e.target.value} : li)
      setList_of_tasks(newList)
    }


  return (

      <div className="container">
            <div className="row">
                  <div className="col-6">
                        <h2 className="alert alert-primary mt-3 text-align-center">Task Manager</h2>
                  </div>
                  <div className="col-6">
                    <h2 className="alert alert-dark mt-3 align-items-center">
                        Tasks : <span className='badge badge bg-success badge-pill'>{list_of_tasks.length}</span>
                    </h2>
                  </div>
            </div>

            <form onSubmit={handleSubmit} >
                  <input 
                      type="text"
                      className='form-control'
                      required = 'required'
                      value={task} 
                      onChange={(e)=>settask(e.target.value)}/>
                  
                  <button className="mt-3 btn btn-outline-success">Add Task</button>
            </form>

            <ul className="list-group mt-3">
                    {
                      list_of_tasks.map((task)=>(
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          {
                            editID === task.id ? (
                            
                            <>
                            
                                  <input 
                                      type="text"
                                      value={task.name} 
                                      onChange={(e)=>handleInputchange(e,task)}/>
                                  <button onClick={()=>seteditID(-1)} className='btn btn-outline-secondary'>Update</button>
                            
                            </>
                              
                            ):

                            (
                              <>
                                    {task.name}
                                
                                <div className="buttons">
                                    <TiEdit onClick={()=>handleEdit(task.id)}/>
                                    <TiDelete  onClick= {() => handleDelete(task.id)} size="1.5rem"/>
                                </div>

                              </>
                            )
                          }
                        </li>
                      ))
                    }
            </ul>
      




      </div>

    )
}

export default App