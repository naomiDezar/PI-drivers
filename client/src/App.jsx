import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing'

function App() {
 

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App
