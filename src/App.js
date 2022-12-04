import React, {useState, useEffect} from 'react'
import{AiOutlinePlus} from 'react-icons/ai'

import Todo from './Todo'
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'


const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#000000] to-[#878787]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input:`border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count:`text-center p-2`
}


function App() {
  const [todos, setTodos] = useState([]);
  const[input, setInput] = useState('')
  // create to do
  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === ''){
      alert('Please enter a valid todo') 
      return     //return to stop the code
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('') //when submit it will clear the text field
  }

  //read to do from FB
useEffect(()=> {
const q = query(collection(db, 'todos'))
const unsubscribe = onSnapshot(q, (querySnapshot) =>{
  let todosArr =[]
  querySnapshot.forEach((doc) => {
    todosArr.push({...doc.data(), id:doc.id})
  });

  setTodos(todosArr)
})
return() => unsubscribe()
},[])
  //update todo in FB

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos' , todo.id), {
      completed: !todo.completed
    })
  }
  //delete todo

  const deleteTodo = async(id) => {
    await deleteDoc(doc(db, 'todos', id))
  }
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Tasks to do App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} 
          onChange={(e) => setInput(e.target.value)}
            className={style.input}
             type="text"
              placeholder='Add Todo'
              />
        <button className={style.button}>
          <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}  />
          ))}
          {todos.length < 1? null:<p className={style.count}>{`You have ${todos.length} tasks to do`}</p>}
        
          
        </ul>
      </div>
    </div>
  );
}

export default App;
