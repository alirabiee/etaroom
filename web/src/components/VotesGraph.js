import React from 'react'
import PropTypes from 'prop-types'
import { daysLabelMap, colourPallet } from './Constants';

class VotesGraph extends React.Component {

    static defaultProps = {
        votes: {},
        participants: []
    }

    static get propTypes() {
        return {
            participants: PropTypes.array,
            votes: PropTypes.object
        };
    }
    
    render() {
        let totalVotes = Object.values(this.props.votes).reduce((t, value) => t + value, 0)
        let maxVote = Object.values(this.props.votes).reduce((t, value) => Math.max(t, value), 0)
        let rows = Object.keys(daysLabelMap).map((d, i) =>
            <tr key={d}>
                <td>{daysLabelMap[d]}</td>
                <td>
                    <div className="text-right" style={{ color: 'white', width: (maxVote > 0 ? (this.props.votes[d]|0) * 100 / maxVote : 0) + '%', height: '100%', backgroundColor: colourPallet[i%colourPallet.length] }}>
                        {Math.round(totalVotes > 0 ? (this.props.votes[d]|0) * 100 / totalVotes : 0)}%
                    </div>
                </td>
            </tr>
        )
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr><th style={{ width: '20%' }}>ETA</th><th>Votes</th></tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote className="blockquote-reverse"><b>Participants</b><br/>{this.props.participants.map(p => p.name).join(', ')}</blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default VotesGraph