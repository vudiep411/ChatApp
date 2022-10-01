import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import MediaQuery from 'react-responsive'
import ChatNavbar from '../components/ChatNavbar'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRooms } from '../actions/firebase'

const Home = () => {
  const [selectedConvoId, setSelectedConvoId] = useState('')
  const userProfile = useSelector(state => state.user)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const getRooms = async () => {
      await getChatRooms(userProfile.id, setRooms)
    }
    getRooms()
  }, [])
  

  return (
    <div>
      <ChatNavbar/>
      <MediaQuery minWidth={500}>
        <div style={{display: 'flex'}}>
          <SideBar selectedConvoId={selectedConvoId} setSelectedConvoId={setSelectedConvoId} rooms={rooms} setRooms={setRooms}/>
          <Messages selectedConvoId={selectedConvoId}/>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Home