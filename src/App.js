import React from 'react'
import NavBar from './components/NavBar/NavBar';
import './App.css'
import Banner from './components/Banner/Banner';
import RowPost from './components/rowPosts/RowPost';
import { originals,action,comedy } from './urls'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title="Netflix Originals" />
      <RowPost url={action} title="Action Movies" isSmall/>
      <RowPost url={comedy} title="Comedy Movies" />
    </div>
  );
}

export default App;
