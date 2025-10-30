import { useLocation , Route , Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home';
import Footer from './components/Footer';
import AllRoom from './Pages/AllRoom';
import RoomDetails from './Pages/RoomDetails';
import MyBooking from './Pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './Pages/hotelOwner/Layout';
import DashBoard from './Pages/hotelOwner/DashBoard';
import AddRoom from './Pages/hotelOwner/AddRoom';
import ListRoom from './Pages/hotelOwner/ListRoom';

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
          <Route path='/owner' element={<Layout/>}> 
              <Route index element={<DashBoard/>}/>
              <Route path='add-room' element={<AddRoom/>}/>
              <Route path='list-room' element={<ListRoom/>}/>
          </Route>

        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
