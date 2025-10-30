import { useLocation , Route , Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home';
import Footer from './components/Footer';
import AllRoom from './Pages/AllRoom';
import RoomDetails from './Pages/RoomDetails';
import MyBooking from './Pages/MyBooking';
import HotelReg from './components/HotelReg';

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      { false && <HotelReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRoom/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBooking/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
