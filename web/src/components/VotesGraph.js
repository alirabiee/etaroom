import React from 'react'

class VotesGraph extends React.Component {
	render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover">
                        <thead>
                            <tr><th style={{ width: '20%' }}>ETA</th><th>Votes</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>1 day</td><td><div className="bg-primary" style={{ width: '100%', height: '100%' }}>&nbsp;</div></td></tr>
                            <tr><td>2 days</td><td></td></tr>
                            <tr><td>3 days</td><td></td></tr>
                            <tr><td>4 days</td><td></td></tr>
                            <tr><td>1 week</td><td></td></tr>
                            <tr><td>1.4 weeks</td><td></td></tr>
                            <tr><td>2 weeks</td><td></td></tr>
                            <tr><td>3 weeks</td><td></td></tr>
                            <tr><td>4 weeks</td><td></td></tr>
                            <tr><td>5 weeks</td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
  }
}

export default VotesGraph