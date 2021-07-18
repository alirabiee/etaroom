import React from 'react'
import { daysLabelMap } from './Constants'

/* eslint-disable react/prop-types */
export default function VotingConcludedMessage(props) {
    if(props.vote)
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12" key="voting-concluded-msg"><b>Voting is concluded!</b> You voted for {daysLabelMap[props.vote]}.</div>
                </div>
            </div>
        )
    else
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12" key="voting-concluded-msg"><b>Voting is concluded!</b> You did not cast a vote.</div>
            </div>
        </div>
    )
}
