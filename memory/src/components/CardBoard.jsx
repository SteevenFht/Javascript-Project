import React from 'react';
import Cards from './Card.jsx';
import { UNKNOWN_SRC } from '../data/cardData.js';
import { shuffle } from '../scripts/utils.js';

import "../assets/style/cardBoard.css";

export default class CardBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {cards: this.props.Cartes};
    }

   
    render(){
        let cartes = this.props.cards.map((data) => (
            <Cards
              src={data.src}
              desc={data.description}
              key={data.id}
              index={this.props.cards.indexOf(data)}
              Unknown={UNKNOWN_SRC}
              visible={data.visible}
              flip={this.props.flipCard}
              turnedUp={this.props.turnedUp}
              clickable={data.clickable}
            />
          ));
        return (<div className="card">
            {cartes}
        </div>);
    }
    
}