// src/cardList.jsx
import React from 'react'

class CardList extends React.Component {
    render() {
        let elements = this.props.cards.map((element) => {
            return (<li key={element.id}>{element.name}</li>)
        })
        return <ul>{elements}</ul>
    }
}

export default CardList