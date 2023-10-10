import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [res, setRes] = useState<string>('Nothing yet...');
  const question = 'write me a poem about grass.';
  const handleClick =(e)=>{
    axios('https://sage-lolly-8294fc.netlify.app/.netlify/functions/transcription-function', {params:{question}}).then(res =>{
        console.log(res);
        setRes('something!')
    })
  }
  return (
    <>
      <div>
        <h1>Here we are</h1>
        <p>{res}</p>
        <button onClick={handleClick}>Click this</button>
       </div>
    </>
  )
}

export default App
