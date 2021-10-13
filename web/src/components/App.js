import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import Room from './Room'
import useStickyState from './StickyState'

const hasLoggedIn = () => location.href.indexOf('/join/') > 0
const parseRoomId = () => hasLoggedIn() ? location.href.substr(location.href.lastIndexOf('/')+1) : null

export default function App() {
  const parsedRoomId = parseRoomId()

  const [appState, setAppState] = useStickyState({loggedIn: hasLoggedIn(), admin: false, roomId: parsedRoomId, lastVoted: Date.now()}, "ETARoom")

  const onCreateRoom = (roomId, password) => setAppState({loggedIn: true, admin: true, roomId, password, lastVoted: new Date()})

  const onJoinRoom = (participantId) => setAppState(Object.assign({}, appState, {participantId}))

  const onVote = () => setAppState(Object.assign({}, appState, {lastVoted: new Date()}))

  const onLeaveRoom = () => {setAppState({}); window.location.href = '/'}

  if((parsedRoomId && appState.roomId && appState.roomId != parsedRoomId) || (Date.now() - appState.lastVoted > 12 * 3600000)) {
    setAppState({})
    window.location.reload()
  }

  let page = []

  if(appState.loggedIn)
    page.push(<Room key="room" roomId={appState.roomId} participantId={appState.participantId} isAdmin={appState.admin} password={appState.password} onJoin={onJoinRoom} onLeave={onLeaveRoom} onVote={onVote} />)
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
