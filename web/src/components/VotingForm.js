import React from 'react'
import PropTypes from 'prop-types'
import { joinRoom } from './API'

class VotingForm extends React.Component {
    state = { participantId: '', participantName: '' }

    constructor(props) {
        super(props)
        this.state.participantId = props.participantId
    }

    static get propTypes() {
        return {
            roomId: PropTypes.string,
            participantId: PropTypes.string
        };
    }

    join = () => {
        joinRoom(this.props.roomId, this.state.participantName).then(data => { if (data.id) this.setState({ participantId: data.id }) })
            .catch(() => alert('Could not join, ' + this.state.participantName))
    }

    render() {
        if (this.state.participantId)
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">{this.state.participantId}</div>
                    </div>
                </div>
            )
        else
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12"><label htmlFor="participantName">Your name:&nbsp;</label><input id="participantName" value={this.state.participantName} onChange={event => this.setState({ participantName: event.target.value })} /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12"><button onClick={this.join}>Join</button></div>
                    </div>
                </div>
            )
    }
}

export default VotingForm