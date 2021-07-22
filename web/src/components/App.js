import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import Room from './Room'
import useStickyState from './StickyState'

const hasLoggedIn = () => location.href.indexOf('/join/') > 0
const parseRoomId = () => hasLoggedIn() ? location.href.substr(location.href.lastIndexOf('/')+1) : null

export default function App() {
  const parsedRoomId = parseRoomId()

  const [appState, setAppState] = useStickyState({loggedIn: hasLoggedIn(), admin: false, roomId: parsedRoomId}, "ETARoom")


  const onCreateRoom = (roomId, password) => setAppState({loggedIn: true, admin: true, roomId, password})

  const onJoinRoom = (participantId) => setAppState(Object.assign({}, appState, {participantId}))

  const onLeaveRoom = () => {setAppState({}); window.location.href = '/'}

  if(parsedRoomId && appState.roomId && appState.roomId != parsedRoomId) {
    alert('You have already joined another room. Please leave that first before joining a new room.')
    window.location.href = '/'
  }

  let page = []

  if(appState.loggedIn)
    page.push(<Room key="room" roomId={appState.roomId} participantId={appState.participantId} isAdmin={appState.admin} password={appState.password} onJoin={onJoinRoom} onLeave={onLeaveRoom} />)
  else
    page.push(<CreateRoomForm key="room-creation-form" onSubmit={onCreateRoom} />)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {page}
        </div>
      </div>
    </div>
  )
}
