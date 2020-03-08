import React, { useEffect, useState } from 'react';
import ProgressSet from './components/ProgressSet';
import axios from "axios"


const _URL = "https://pb-api.herokuapp.com/bars"

interface Data {
  buttons: Array<number>,
  bars: Array<number>,
  limit: number
}

function App() {

  let [data, setData] = useState<Data>();

  // data = { "buttons": [25, 5, -10, -25, 100, -100], "bars": [100, 150, 200, 300], "limit": 300 }

  useEffect(() => {
    axios.get<Data>(_URL)
      .then(response => setData(response.data))
  }, [])

  return <div style={{ width: "320px" }}>
    <h1>Progress Bars Demo</h1>
    {data ? <ProgressSet {...data} /> : <></>}
  </div>;
}

export default App;
