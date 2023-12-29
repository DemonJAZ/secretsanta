import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SantaSelector from './pages/SantaSelector'
import Snowfall from 'react-snowfall'
const snowflake1 = document.createElement('img')
snowflake1.src = '/snowflake1.png'
const snowflake2 = document.createElement('img')
snowflake2.src = '/snowflake2.png'
const snowflake3 = document.createElement('img')
snowflake2.src = '/snowflake3.png'
const snowflake4 = document.createElement('img')
snowflake2.src = '/snowflake.png'
const images = [snowflake1, snowflake2,snowflake3,snowflake4]
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/getsanta",
      element: <SantaSelector />,
    },
  ])

  return (
    <>
      <div className='bg-red-500 h-full min-h-screen'>
        <Snowfall images={images} radius={[15, 25]}/>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
