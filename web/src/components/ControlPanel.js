import React from 'react'
import PropTypes from 'prop-types'
import { concludeRoom, restartRoom } from './API'

class ControlPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            roomId: PropTypes.string,
            password: PropTypes.string,
            mode: PropTypes.string,
            onConclude: PropTypes.func,
            onRestart: PropTypes.func,
        };
    }

    conclude = () => {
        concludeRoom(this.props.roomId, this.props.password).then(data => this.props.onConclude(data)).catch(() => alert("Sorry, something went wrong concluding the voting"))
    }

    restart = () => {
        restartRoom(this.props.roomId, this.props.password).then(data => this.props.onRestart(data)).catch(() => alert("Sorry, something went wrong restarting the voting"))
    }

    render() {
        let button;
        if(this.props.mode == 'VOTING')
            button = <button type="button" className="btn btn-danger" onClick={this.conclude}>Conclude</button>
        else
            button = <button type="button" className="btn btn-warning" onClick={this.restart}>Restart</button>
        return (
            <>
                <div key="room-header" className="container-fluid">
                    <div className="row">
                        <div className={"col-md-12" + ( this.props.mode == 'VOTING' ? " text-right" : "")}>
                            {button}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ControlPanel