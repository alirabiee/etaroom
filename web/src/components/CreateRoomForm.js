import React from 'react'
import PropTypes from 'prop-types'
import { createRoom } from './API'

class CreateRoomForm extends React.Component {
    state={ name: '', password:'' }

    static get propTypes() { 
        return { 
            name: PropTypes.string, 
            password: PropTypes.string,
            onSubmit: PropTypes.func
        }; 
    }

    createRoom = (event) => {
        event.preventDefault();
        createRoom(this.state.name, this.state.password).then(resp => {
            this.props.onSubmit(resp.id, this.state.password);
        }).catch(() => alert('Could not create room, '+this.state.name))

    }

	render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12"><h1>Create a room</h1></div>
                </div>
                <div className="row">
                    <div className="col-md-2"><label htmlFor="name">Room name:</label></div>
                    <div className="col-md-10"><input id="name" autoComplete="false" value={this.state.name} onChange={event => this.setState({name: event.target.value})} /></div>
                </div>
                <div className="row">
                    <div className="col-md-2"><label htmlFor="password">Password: </label></div>
                    <div className="col-md-10"><input id="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})} /></div>
                </div>
                <div className="row">
                    <div className="col-md-12"><button onClick={this.createRoom}>Create room</button></div>
                </div>
            </div>
        )
  }
}

export default CreateRoomForm