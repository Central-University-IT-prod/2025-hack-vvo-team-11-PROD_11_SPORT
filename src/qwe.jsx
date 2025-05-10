import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from './components/Header';
import SportsCarousel from './mainpart/SportsCarousel';

import './App.css'

function App() {
    const eventsData = [{}]; 
  return (
    <>
    <div>
    {/* header */}
      <Header /> {/* Рендерим header */} 
    </div>
    <div>
      
      <SportsCarousel events={eventsData}/>
    </div>

      
    </>
  )
}

export default App