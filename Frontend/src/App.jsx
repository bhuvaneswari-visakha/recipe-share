import React from 'react'
import Head from './components/head'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Contact from './components/Contact'
import { Route, Routes } from 'react-router-dom'
import Features from './components/Features'
import Home2 from './components/Home2'
import Creating from './components/Creating'
import ContactUs from './components/Contact'
import Head2 from './components/Head2'
import Posts from './components/Posts'
import ProfilePage from './components/Profile'
import SinglePost from './components/SinglePost'
import EditPost from './components/EditPost'
const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" Component={Home}/>
            <Route path="/register" Component={Register}/>
            <Route path="/login" Component={Login}/>
            <Route path='/Contact' Component={Contact}/>
            <Route path='/Features' Component={Features}/>
            <Route path='/About' Component={About}/>
            <Route path="/Dashboard" Component={Home2}/>
            <Route path='/create' Component={Creating}/>
            <Route path='/ContactUs' Component={ContactUs}/>
            <Route path='/Posts' Component={Posts}/>
            <Route path='/Profile' Component={ProfilePage}/>
            <Route path='/posts/:id' Component={SinglePost}/>
            <Route path='/edit-post/:id' Component={EditPost}/>
          </Routes>
    </div>
  )
}

export default App
