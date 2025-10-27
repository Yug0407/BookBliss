import { useLocation , Route , Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home';

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
