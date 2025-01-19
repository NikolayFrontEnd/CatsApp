import Navbar from './components/Navbar'
import AllCats from './pages/AllCats'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lovely from './pages/Lovely';
function App() {
  return (
    <>
<BrowserRouter basename = "/CatsApp/">    
<Navbar/> 
<Routes>
<Route path = "/" element = {<AllCats/>} />
<Route path = "/favourite" element = {<Lovely/>} />
</Routes>
</BrowserRouter>
    </>
  )
}
export default App
