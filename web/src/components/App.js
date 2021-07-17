import React, { useState } from 'react'
import CreateRoomForm from './CreateRoomForm'
import VotingForm from './VotingForm'
import Room from './Room'

const hasLoggedIn = () => location.href.indexOf('/join/') > 0
const parseRoomId = () => hasLoggedIn() ? location.href.substr(location.href.lastIndexOf('/')+1) : null

export default function App() {
  const [appState, setAppState] = useState({loggedIn: hasLoggedIn(), admin: false, roomId: parseRoomId()})

  const onCreateRoom = (roomId, password) => setAppState({loggedIn: true, admin: true, roomId, password})

  let page = []

  if(appState.loggedIn)
    page.push(
      <Room roomId={appState.roomId} />,
      <VotingForm roomId={appState.roomId} />
    )
  else
    page.push(<CreateRoomForm onSubmit={onCreateRoom} />)

  return (
    <div>
      {page}
    </div>
  )
}
