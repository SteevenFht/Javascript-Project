import React from 'react';
import "../assets/style/infoZone.css";
import "../assets/style/cardBoard.css";

export default class InfoZone extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="infoZone"> 
                <div className='flips'>Nombre d'essais : {this.props.essais}  </div>
                <div className='last'>{this.props.nom}</div>
                <div className='remaining'>Pairs restantes : {this.props.remainingPairs} </div>
            </div>
        );
    }
}