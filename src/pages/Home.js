import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import MediaQuery from 'react-responsive'
import ChatNavbar from '../components/ChatNavbar'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRooms } from '../actions/firebase'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Home = () => {
  const [selectedConvoId, setSelectedConvoId] = useState('')
  const userProfile = useSelector(state => state.user)
  const [messages, setMessages] = useState({id: null, messages: []})
  const dispatch = useDispatch()

  const [showSideBar, setShowSideBar] = useState(true)

  useEffect(() => {
      dispatch(getChatRooms(userProfile.id))
  }, [userProfile])
  
  const handleOpenSideBar = () => {
    setShowSideBar(prev => !prev)    
    setSelectedConvoId('')
  }

  return (
    <div>
      <ChatNavbar/>
      <MediaQuery minWidth={500}>
        <div style={{display: 'flex'}}>
          <SideBar 
            selectedConvoId={selectedConvoId} 
            setSelectedConvoId={setSelectedConvoId} 
            setMessages={setMessages}
            setShowSideBar={setShowSideBar}
          />
          <Messages 
            selectedConvoId={selectedConvoId}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={499}>
        <div style={{display: 'flex'}}>
          <p 
            style={{
              marginTop: '60px', 
              cursor: 'pointer', 
              position: 'absolute',
              left: '5px'
            }}
            onClick={handleOpenSideBar}
            >
              {showSideBar ? <ArrowBackIosNewIcon/> : <MenuIcon/>}
          </p>
          {showSideBar && 
              <SideBar 
                selectedConvoId={selectedConvoId} 
                setSelectedConvoId={setSelectedConvoId} 
                setMessages={setMessages}
                setShowSideBar={setShowSideBar}
              />
          }
          {selectedConvoId &&
            <Messages 
              selectedConvoId={selectedConvoId}
              messages={messages}
            />
          }
        </div>
      </MediaQuery>
    </div>
  )
}

export default Home