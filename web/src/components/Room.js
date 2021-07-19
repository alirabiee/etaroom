import React from 'react'
import VotesGraph from './VotesGraph'
import PropTypes from 'prop-types'
import { getRoom, getParticipant } from './API'
import VotingForm from './VotingForm'
import VotingConcludedMessage from './VotingConcludedMessage'
import ControlPanel from './ControlPanel'

class Room extends React.Component {
    state = { id: '', name: '', participants: [], myVote: '', participantId: '' }

    constructor(props) {
        super(props)
        this.state.internalId = setInterval(() => this.refreshRoom(), 2000 + Math.ceil(1000 * Math.random()))
        this.refreshRoom()
    }

    static get propTypes() {
        return {
            roomId: PropTypes.string,
            password: PropTypes.string,
            isAdmin: PropTypes.bool
        };
    }

    refreshRoom = () => {
        getRoom(this.props.roomId).then(data => {
            if(data.ballotBox?.mode !== this.state.ballotBox?.mode)
                this.setState(Object.assign({ myVote: '' }, data))
            else
                this.setState(data)
        })
        if(this.state.participantId)
            getParticipant(this.props.roomId, this.state.participantId).catch(() => this.setState({participantId: '', myVote: ''}))
    }

    onJoin = (participantId) => {
        this.setState({participantId})
        this.refreshRoom()
    }

    onVote = (updatedRoomData, myVote) => {
        this.setState(Object.assign({ myVote }, updatedRoomData))
    }

    onConclude = (updatedRoomData) => {
        this.setState(updatedRoomData)
    }

    onRestart = (updatedRoomData) => {
        this.setState(Object.assign({ myVote: '' }, updatedRoomData))
    }

    render() {
        let page = [
            (
                <div key="room-header" className="container-fluid">
                    <div className="row">
                        <div className="col-md-12"><h1>{this.state.name} <small><a href={'/join/' + this.state.id}>Link to Join</a></small></h1></div>
                    </div>
                </div>
            ),
            (<VotesGraph key="graph" participants={this.state.participants} votes={this.state.ballotBox?.votes} />)
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