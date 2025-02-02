import { Box,useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import  HomePage  from './pages/HomePage'
import  CreatePage  from './pages/CreatePage'
import Navbar from "./ComponentsReact/Navbar"

function App(){
  const bg = useColorModeValue("gray.200", "gray.800");
  return(
   <Box minH={"100vh"}
   bg={bg}
   >
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/create" element={<CreatePage />}/>
    </Routes>
    
   </Box>
  )
}

export default App