import React from 'react'
import VotesGraph from './VotesGraph'
import PropTypes from 'prop-types'
import { getRoom, getParticipant } from './API'
import VotingForm from './VotingForm'
import VotingConcludedMessage from './VotingConcludedMessage'
import ControlPanel from './ControlPanel'

class Room extends React.Component {
    state = { id: '', name: '', participants: [], myVote: '' }

    constructor(props) {
        super(props)
        this.state.participantId = this.props.participantId
        this.state.intervalId = setInterval(() => this.refreshRoom(), 2000 + Math.ceil(1000 * Math.random()))
        this.refreshRoom()
    }

    static get propTypes() {
        return {
            roomId: PropTypes.string,
            participantId: PropTypes.string,
            password: PropTypes.string,
            isAdmin: PropTypes.bool,
            onJoin: PropTypes.func,
            onLeave: PropTypes.func,
            onVote: PropTypes.func
        };
    }

    refreshRoom = () => {
        getRoom(this.props.roomId).then(data => {
            if(data.ballotBox?.mode === 'VOTING' && this.state.ballotBox?.mode === 'CONCLUDED')
                this.setState(Object.assign({ myVote: '', participants: [] }, data))
            else
                this.setState(data)
        }).catch(() => { clearInterval(this.state.intervalId); this.onLeave(null, 'Looks like the room does not exist anymore, would you like to leave?') })
        if(this.state.participantId)
            getParticipant(this.props.roomId, this.state.participantId).catch(() => {this.setState({participantId: '', myVote: ''}); this.props.onJoin('')})
    }

    onJoin = (participantId) => {
        this.setState({participantId})
        this.refreshRoom()
        this.props.onJoin(participantId)
    }

    onVote = (updatedRoomData, myVote) => {
        this.setState(Object.assign({ myVote }, updatedRoomData))
        this.props.onVote()
    }

    onConclude = (updatedRoomData) => {
        this.setState(updatedRoomData)
    }

    onRestart = (updatedRoomData) => {
        this.setState(Object.assign({ myVote: '', participants: [] }, updatedRoomData))
    }

    onLeave = (event, msg) => {
        if(confirm(msg || "Are you sure you want to leave the room?"))
            this.props.onLeave();
    }

    render() {
        let page = [
            (
                <div key="room-header" className="container-fluid">
                    <div className="row">
                        <div className="col-md-10"><h1>{this.state.name} <small><a href={'/join/' + this.state.id}>Link to Join</a></small></h1></div>
                        <div className="col-md-2 text-right"><br/><button type="button" className="btn btn-danger" onClick={this.onLeave}>Leave room</button></div>
                    </div>
                </div>
            ),
            (<VotesGraph key="graph" participants={this.state.participants} votes={this.state.ballotBox?.votes} voteBitmap={this.state.ballotBox?.voteBitmap} />)
        ]
        if (this.state.ballotBox?.mode === 'VOTING')
            page.push(<VotingForm key="voting-form" roomId={this.props.roomId} onSubmit={this.onVote} onJoin={this.onJoin} participantId={this.state.participantId} />)
        else
            page.push(<VotingConcludedMessage key="voting-concluded-msg" vote={this.state.myVote} />)
        if(this.props.isAdmin)
            page.push([<br key="room-ln"/>,<ControlPanel key="control-panel" roomId={this.props.roomId} password={this.props.password} mode={this.state.ballotBox?.mode} onConclude={this.onConclude} onRestart={this.onRestart} />])
        return (
            <>
                {page}
            </>
        );
    }
}

export default Room