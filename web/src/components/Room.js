import React from 'react'
import VotesGraph from './VotesGraph'
import PropTypes from 'prop-types'
import { getRoom } from './API'

class Room extends React.Component {
    state = {id: '', name: '', participants:[]}

    constructor(props) {
        super(props)
        this.state.internalId = setInterval(() => this.refreshRoom(), 2000 + Math.ceil(1000 * Math.random()))
        this.refreshRoom()
    }

    componentWillUnmount() {
        clearInterval(this.state.internalId)
    }

    refreshRoom = () => {
        getRoom(this.props.roomId).then(data => this.setState(data))
    }

    static get propTypes() { 
        return {
            roomId: PropTypes.string
        }; 
    }

	render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12"><h1>{this.state.name}</h1> <a href={'/join/'+this.state.id}>Shareing Link</a></div>
                </div>
                <VotesGraph participants={this.state.participants} />
            </div>
        );
  }
}

export default Room