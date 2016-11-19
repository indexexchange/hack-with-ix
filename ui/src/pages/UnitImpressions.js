import React, { Component } from 'react'

export default class UnitImpressions extends Component {

  constructor () {
    super()
    this.state = { impressionList : [] }
  }

  refresh() {
    console.log("Refreshing ...");

    fetch('http://localhost:8000/impressions?dc=NA')
      .then(res => res.json())
      .then(json => {
        this.setState({ impressionList: json.data})
      })
      .catch(err => { console.log('ERROR', err); });
  }

  componentWillMount() {
    console.log("componentWillMount ...");
    this.refresh()
  }


  render () {
    return (
      <UnitImpressionsListView
          impressions={this.state.impressionList}
          refresh={this.refresh.bind(this) }/>
    )
  }
}

class UnitImpressionsListView extends Component {

	render () {
		var data = {};
	    return (
	      <div>
	        <h1>Unit Impressions List</h1>

	        <ol>
	          {this.props.impressions.map(function(impression, i) {
		          	if (impression.format in data.keys()) {
		          		data[impression.format] += impression.impressions
		          	} else {
		          		data[impression.format] = 0
		          	}
	          	}
	          )}
	        </ol>

	        <button onClick={this.props.refresh}>Refresh</button>
	      </div>
	    )
	}
}

class UnitImpressionsView extends Component {
  render () {
    var impression = this.props.impressionData
    return (
      <li> { impression.format } : { impression.impressions } </li>
    )
  }
}
