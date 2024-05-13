import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Book from './pages/Book'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'

const App = () => {
  return (
    <div className="bg-gradient-to-r from-rose-200 via-lime-100 to-rose-100 min-h-screen">
      <Navbar />
      <Routes >
        <Route path='/'>
          <Route index element= {<HomePage />} />
          <Route exact path='/get' element= {<Events />} />
          <Route exact path= '/get-details/:id' element = {<EventDetails />} />
          <Route exact path='/book' element= {<Book />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App