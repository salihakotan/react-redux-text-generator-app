import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateParagraphs, paragraphSelector, statusSelector } from './redux/paragraphSlice';

function App() {


  const [paras, setParas] = useState("4")

  const dispatch = useDispatch()

  const paragraph = useSelector(paragraphSelector)
  const status = useSelector(statusSelector)


  const [format, setFormat] = useState("text")





  useEffect(()=> {
    if(status ==="idle") {
      dispatch(generateParagraphs({paras:"4",format:"text"}))
    }
  },[dispatch,status])


  
  if(status === "failed") {
      return  <div>Failed</div>
  }

  if(status === "loading") {
    return  <div>Loading...</div>
}



  return (
    <div className="App">
      <h1>React Redux Text Generator App</h1>
      <hr/>
      <input type='number' value={paras} onChange={(e)=> setParas(e.target.value)}/>
      <select value={format} onChange={(e) => setFormat(e.target.value)} name='format'>
        <option value="text">Text</option>
        <option value="html">HTML</option>
      </select>
      <button onClick={()=> dispatch(generateParagraphs({paras:paras,format:format}))} className='generateBtn'>Generate</button>


    

      {
          status === "succeeded" && (
            <div style={{textAlign:'left'}}>{paragraph.split('\n').map((par,index) => <p key={index}>{par}</p>
              
            )}</div>
          )
      }


    </div>
  );
}

export default App;
