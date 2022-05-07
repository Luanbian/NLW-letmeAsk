import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function Paths() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/rooms/new' element={<NewRoom/>}/>
      <Route path='/rooms/:id' element={<Room/>}/>
    </Routes>
    </BrowserRouter>
 );
}

export default Paths;