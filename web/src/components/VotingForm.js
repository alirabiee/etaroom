import React from 'react'
import PropTypes from 'prop-types'
import { joinRoom, castVote } from './API'
import DaysVoteButton from './DaysVoteButton'

class VotingForm extends React.Component {
    state = { participantName: '', myVote: '' }

    static get propTypes() {
        return {
            roomId: PropTypes.string,
            participantId: PropTypes.string,
            onSubmit: PropTypes.func,
            onJoin: PropTypes.func
        };
    }

    join = (event) => {
        event.preventDefault()
        joinRoom(this.props.roomId, this.state.participantName).then(data => this.props.onJoin(data.id))
            .catch(() => alert('Could not join, ' + this.state.participantName))
    }

    cast = (myVote) => {
        castVote(this.props.roomId, this.props.participantId, myVote).then((data) => {this.setState({myVote}); this.props.onSubmit(data, myVote)})
    }

    render() {
        if (this.props.participantId)
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <DaysVoteButton vote="ONE" selected={this.state.myVote == 'ONE'} onClick={this.cast} />
                            <DaysVoteButton vote="TWO" selected={this.state.myVote == 'TWO'} onClick={this.cast} />
                            <DaysVoteButton vote="THREE" selected={this.state.myVote == 'THREE'} onClick={this.cast} />
                            <DaysVoteButton vote="FOUR" selected={this.state.myVote == 'FOUR'} onClick={this.cast} />
                            <DaysVoteButton vote="FIVE" selected={this.state.myVote == 'FIVE'} onClick={this.cast} />
                            <DaysVoteButton vote="SEVEN" selected={this.state.myVote == 'SEVEN'} onClick={this.cast} />
                            <DaysVoteButton vote="TEN" selected={this.state.myVote == 'TEN'} onClick={this.cast} />
                            <DaysVoteButton vote="FIFTEEN" selected={this.state.myVote == 'FIFTEEN'} onClick={this.cast} />
                            <DaysVoteButton vote="TWENTY" selected={this.state.myVote == 'TWENTY'} onClick={this.cast} />
                            <DaysVoteButton vote="TWENTY_FIVE" selected={this.state.myVote == 'TWENTY_FIVE'} onClick={this.cast} />
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <form className="container-fluid">
                    <div className="row">
                        <div className="col-md-12"><label htmlFor="participantName">Your name:&nbsp;</label><input id="participantName" value={this.state.participantName} onChange={event => this.setState({ participantName: event.target.value })} />&nbsp;<button type="submit" onClick={this.join}>Join</button></div>
                    </div>
                </form>
            )
    }
}

export default VotingForm