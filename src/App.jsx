import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]= useState(false)
  const[charAllowed,setCharAllowed]= useState(false)
  const[password,setPassWord] =useState("")

//useRef hook
const passwordRef =useRef(null)



const passwordGenerator = useCallback(()=>{
  let pass=""
  let str ="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  if (numberAllowed){str+="1234567890"}
  if (charAllowed){str+="!@#$%^&*()_+-={}|[]\:;'<>?,./`~"}
for (let i = 0; i < length; i++) {
  let n=Math.random();
  n=str.length*n;
  n=Math.floor(n);
  pass+=str.charAt(n);
  }
  setPassWord(pass)
}
  ,[length, numberAllowed, charAllowed,setPassWord])


const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,54)
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect(()=>{
  passwordGenerator()
},[length,charAllowed,numberAllowed,passwordGenerator])


  return (
    <>
    <div className='bg-cyan-500 rounded-lg px-4 w-full max-w-md mx-auto shadow-md my-4 py-3 mb-4 '>
      <div className='flex place-content-center my-0 mb-1 text-cyan-100 font-semibold font-mono'><h1>PassWord Generator</h1></div>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 text-red-600 ">
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3 font-semibold font-mono'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className="bg-blue-500 px-3 text-white py-0.5 hover:bg-blue-600">copy</button>
      </div>
      <div className='flex text-cyan-900 justify-between'>
        <div className='flex' >
          <input 
          type="range" 
          min={3} 
          max={54} 
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <p className='w-20'>Length: {length}</p>  
        </div>
        <div className=''>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=> !prev)
          }}
          className='cursor-pointer'
          ></input>
          <label className='mx-0.5'>
            Numbers
          </label>
        </div>
        <div className=''>
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=> !prev)
          }}
          className='cursor-pointer'
          ></input>
          <label className='mx-0.5'>
            Characters
          </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
