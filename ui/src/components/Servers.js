import React, { Component } from 'react'


// export class Servers extends Component {

//   constructor () {
//     super()
//     this.state = { servers : [] }
//   }


//   refresh(){
//     console.log("Refreshing ...");

//     fetch('http://localhost:8000/servers')
//       .then(res => res.json())
//       .then(json => {
//         this.setState({ servers: json.data})
//       })
//       .catch(err => { console.log('ERROR', err); });
//   }


//   componentWillMount() {
//     console.log("componentWillMount ...");
//     this.refresh()
//   }


//   render () {
//     return (
//       <ServerListView
//           servers={this.state.servers}
//           refresh={this.refresh.bind(this) }/>
//     )
//   }
// }



// class ServerListView extends Component {

//   render () {
//     return (
//       <div>
//         <h1>Server List</h1>

//         <ol>
//           {this.props.servers.map((server, i) =>
//             <ServerView key={i} server={server}/>
//           )}
//         </ol>

//         <button onClick={this.props.refresh}>Refresh</button>
//       </div>
//     )
//   }
// }

// class ServerView extends Component {
//   render () {
//     var server = this.props.server
//     return (
//       <li>Server { server.id } in data center {server.dc}</li>
//     )
//   }
// }


/* IMPRESSIONS */

export default class Impressions extends Component {

  constructor () {
    super()
    this.state = { impressions : [] }
  }


  refresh(){
    console.log("Refreshing ...");

    fetch('http://localhost:8000/impressions?dc=NA')
      .then(res => res.json())
      .then(json => {
        this.setState({ impressions: json.data})
      })
      .catch(err => { console.log('ERROR', err); });

    fetch('http://localhost:8000/impressions?dc=EU')
      .then(res => res.json())
      .then(json => {
        this.setState({ impressions: json.data})
      })
      .catch(err => { console.log('ERROR', err); });

    fetch('http://localhost:8000/impressions?dc=AS')
      .then(res => res.json())
      .then(json => {
        this.setState({ impressions: json.data})
      })
      .catch(err => { console.log('ERROR', err); });


  }



  componentWillMount() {
    console.log("componentWillMount ...");
    this.refresh()
  }

    /* Pasrse the impression data from the server into a dictionary
   *
   * Key: hour, Value: total spend
   */
  getTimeToCost(impressionData) {
    var timeToCostData = {};
    var impressions = impressionData;
    for (impression in impressions) {
      var time = new Date(Date.UTC (impression.timestamp) )
      // console.log(time);
      if (!(time in timeToCostData)) {
        timeToCostData[time] = impression.spend;
      } else {
        timeToCostData[time] += impression.spend;
      }
    }
    console.log(timeToCostData);
    return timeToCostData;
  }

  render () {
    /* return (
          <Center>
           <h1>Best Hour: {hour} </h1>
          </Center>
      )*/
    // return <h1>{this.getTimeToCost(this.state.impressions)}</h1>
    return ( 
      <ImpressionListView
          impressions={this.state.impressions}
          refresh={this.refresh.bind(this) }/>
    )
  }
}

// console.log("test", Impressions.getTimeToCost());

class ImpressionListView extends Component {

  render () {
    return (
      <div>
        <h1>Impression List</h1>

        <ol>
          {this.props.impressions.map((impression, i) =>
            <ImpressionView key={i} impression={impression}/>
          )}
        </ol>

        <button onClick={this.props.refresh}>Refresh</button>
      </div>
    )
  }
}

class ImpressionView extends Component {
  render () {
    var impression = this.props.impression
    return (
      <li>Impression { impression.format } has {impression.impressions} impressions</li>
    )
  }
}
