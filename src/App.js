import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import Sidenav from "./components/Sidenav"
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";


// import "./App.css"
// import {Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  const [ltp, setLtp] = useState({
    Banknifty : 0,
    Finnifty  : 0,
    Nifty : 0
  })
//   const theme = useTheme()

  
  const {lastJsonMessage} = useWebSocket('wss://functionup.fintarget.in/ws?id=fintarget-functionup')
  
  useEffect(()=>{
    if(lastJsonMessage){
      setLtp({
        Banknifty : lastJsonMessage.Banknifty,
        Finnifty  : lastJsonMessage.Finnifty,
        Nifty : lastJsonMessage.Nifty
      })
    }
    
    
  },[lastJsonMessage])
  return (

    <div>
      <Navbar Nifty={ltp.Nifty} BankNifty={ltp.Banknifty} FinNifty={ltp.Finnifty}/>

      <Box height={20}/>
      <Box sx={{display:"flex"}}>
        <Sidenav Nifty={ltp.Nifty}/>
      </Box>
    </div>
  )
}

export default App
