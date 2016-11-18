import React, { Component } from 'react'


export default class Servers extends Component {

  constructor () {
    super()
    this.state = { servers : [] }
  }


  refresh(){
    console.log("Refreshing ...");

    fetch('http://localhost:8000/servers')
      .then(res => res.json())
      .then(json => {
        this.setState({ servers: json.data})
      })
      .catch(err => { console.log('ERROR', err); });
  }


  componentWillMount() {
    console.log("componentWillMount ...");
    this.refresh()
  }


  render () {
    return (
      <ServerListView
          servers={this.state.servers}
          refresh={this.refresh.bind(this) }/>
    )
  }
}



class ServerListView extends Component {

  render () {
    return (
      <div>
        <h1>Server List</h1>

        <ol>
          {this.props.servers.map((server, i) =>
            <ServerView key={i} server={server}/>
          )}
        </ol>

        <button onClick={this.props.refresh}>Refresh</button>
      </div>
    )
  }
}


class ServerView extends Component {
  render () {
    var server = this.props.server
    return (
      <li>Server { server.id } in data center {server.dc}</li>
    )
  }
}
