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
            <form className="form-horizontal">
                <div className="form-group">
                    <div className="col-md-12"><h1>Create a room</h1></div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label" htmlFor="name">Room name:</label>
                    <div className="col-md-10"><input id="name" className="form-control" value={this.state.name} onChange={event => this.setState({name: event.target.value})} /></div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label" htmlFor="password">Password: </label>
                    <div className="col-md-10"><input id="password" className="form-control" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})} /></div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-2 col-md-10"><button type="submit" onClick={this.createRoom}>Create {this.state.name || 'a'} room</button></div>
                </div>
            </form>
        )
  }
}

export default CreateRoomForm