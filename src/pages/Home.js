import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import MediaQuery from 'react-responsive'
import ChatNavbar from '../components/ChatNavbar'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRooms } from '../actions/firebase'
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {
  const selectedConvoId = useSelector(state => state.selectedConvo)
  const userProfile = useSelector(state => state.user)
  const [messages, setMessages] = useState({id: null, messages: []})
  const dispatch = useDispatch()

  const [showSideBar, setShowSideBar] = useState(true)

  useEffect(() => {
      dispatch(getChatRooms(userProfile.id))
  }, [userProfile, dispatch])
  
  const handleOpenSideBar = () => {
    setShowSideBar(prev => !prev) 
    dispatch({type: 'CLOSE_CONVO'})   
  }

  return (
    <div>
      <ChatNavbar/>
      <MediaQuery minWidth={500}>
        <div style={{display: 'flex'}}>
          <SideBar  
            setMessages={setMessages}
            setShowSideBar={setShowSideBar}
          />
          <Messages 
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
              left: '5px',
              zIndex: '999'
            }}
            onClick={handleOpenSideBar}
            >
              {!showSideBar && <MenuIcon fontSize='large'/>}
          </p>
          {showSideBar && 
              <SideBar 
                setMessages={setMessages}
                setShowSideBar={setShowSideBar}
              />
          }
          {selectedConvoId &&
            <Messages 
              setMessages={setMessages}
              messages={messages}
            />
          }
        </div>
      </MediaQuery>
    </div>
  )
}

export default Home