import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import MediaQuery from 'react-responsive'
import ChatNavbar from '../components/ChatNavbar'
import Messages from '../components/Messages'
import ChatField from '../components/ChatField'

const Home = () => {
  const [selectedConvoId, setSelectedConvoId] = useState('')

  return (
    <div>
      <ChatNavbar/>
      <MediaQuery minWidth={500}>
        <div style={{display: 'flex'}}>
          <SideBar selectedConvoId={selectedConvoId} setSelectedConvoId={setSelectedConvoId}/>
          <Messages selectedConvoId={selectedConvoId}/>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Home