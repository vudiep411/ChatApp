import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import MediaQuery from 'react-responsive'
import ChatNavbar from '../components/ChatNavbar'
import Messages from '../components/Messages'
import ChatField from '../components/ChatField'
// import { useDispatch } from 'react-redux'
// import { getObj } from '../actions/object'


const Home = () => {
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //   dispatch(getObj())
    // }, [dispatch])

    // const {people} = useSelector(state => state.object)
    // console.log(people)
    // if(people.length === 0) return null
  const [chatMsg, setChatMsg] = useState('')
  return (
    <div>
      <ChatNavbar/>
      <MediaQuery minWidth={500}>
        <div style={{display: 'flex'}}>
          <SideBar/>
          <Messages/>
        </div>
        <ChatField chatMsg={chatMsg} setChatMsg={setChatMsg}/>
      </MediaQuery>
    </div>
  )
}

export default Home