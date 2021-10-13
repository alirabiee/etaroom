import React from 'react'
import PropTypes from 'prop-types'
import { daysLabelMap, colourPallet } from './Constants';

class VotesGraph extends React.Component {

    static defaultProps = {
        votes: {},
        voteBitmap: {},
        participants: []
    }

    static get propTypes() {
        return {
            participants: PropTypes.array,
            votes: PropTypes.object,
            voteBitmap: PropTypes.object
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
        const participants = this.props.participants.map((p, i) => 
            {
                if(this.props.voteBitmap[p.id])
                    return <span key={p.name + i}>{p.name}{String.fromCodePoint('0x1F607')}{i < this.props.participants.length - 1 ? ' | ': ''}</span>
                return <span key={p.name + i}>{p.name}{String.fromCodePoint('0x1F914')}{i < this.props.participants.length - 1 ? ' | ': ''}</span>
            }
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
                        <blockquote className="blockquote-reverse"><b>Participants</b><br/>{participants}</blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default VotesGraph