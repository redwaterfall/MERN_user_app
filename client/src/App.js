import React from 'react';
import './App.css';

function App() {
 
  let [ usersValue, setUsers] = React.useState([]);
  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  
  async function putUser(){
    if(name != null && email != null){
    let body = {name:`${name}`,email:`${email}`}
    try{
       await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }
    catch(error){
      console.log({error})
    }
  }
  }
  
 async function deleteUser(){
  if(name != null || email != null){
    let body = {name:`${name}`,email:`${email}`}
    try{
       await fetch("http://localhost:3000/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }
    catch(error){
      console.log({error})
    }
  }
 }

 async function getUsers(){
    let users = await fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then((data) => {
        return data; 
    });
    return users;
  }
  async function clicked(){
    let res = await getUsers();

    setUsers([])
    res.forEach(element => {
      console.log(element.name)

      setUsers(usersValue=> [...usersValue, element])

    });

  }
  function getName(e){
    setName(e.target.value)
  }
  function getEmail(e){
    setEmail(e.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
      <input onChange={getName}></input>
      <input onChange={getEmail}></input>
      <button onClick={clicked}>GET</button>
      <button onClick={putUser}>PUT</button>
      <button onClick={deleteUser}>DELETE</button>
      <p>{name}</p>
      <p>{email}</p>
      <div>
      {usersValue.map((elements, i) => (
       <p key={i}>{elements.name}:   {elements.email}</p> 
       
      ))}

   
      </div> 

      </header>
    </div>
  );
}

export default App;
