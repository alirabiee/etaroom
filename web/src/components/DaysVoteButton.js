import React from 'react'
import { daysLabelMap } from './Constants'

/* eslint-disable react/prop-types */
export default function DaysVoteButton(props) {
    const classMap = {
        "HALF": "btn-success",
        "ONE": "btn-success",
        "TWO": "btn-success",
        "THREE": "btn-success",
        "FOUR": "btn-success",
        "FIVE": "btn-info",
        "SEVEN": "btn-info",
        "TEN": "btn-info",
        "FIFTEEN": "btn-warning",
        "TWENTY": "btn-warning",
        "TWENTY_FIVE": "btn-warning",
    }

    return (
        <>
            <button type="button" className={"btn " + (props.selected ? "btn-primary" : classMap[props.vote])} onClick={() => props.onClick(props.vote)}>{daysLabelMap[props.vote]}</button>
        </>
    )
}
