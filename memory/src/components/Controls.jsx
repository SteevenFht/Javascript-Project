import React from 'react';
import Timer from './timer.jsx';

import "../assets/style/controls.css";
import "../assets/style/cardBoard.css";

export default class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.isPlay = this.state;
        this.state = {on:false};
        this.myBlur = this.myBlur.bind(this);
        this.myClick = this.myClick.bind(this);
        
    }

    myBlur(event){
        this.props.changeNumberOfCards(event.target.value);
        this.isPlay = true;
    }
    myClick(){
        this.isPlay = !this.isPlay;
        this.props.play();
        this.setState( (prevState) => {return{on:!prevState.on, }});
    }
    

    render() {
        return (
            <div className="controls">
                <div>
                    <input type="number" min="2" max={this.props.maxCards} id="number" placeholder='Nombre de pairs' className='pairs' onClick={this.myBlur}></input>
                </div>
                <div>
                    <button onClick={this.myClick}>Jouer</button>
                </div>
                <Timer remainingPairs= {this.props.remainingPairs} isPlay= {this.isPlay} />  
            </div>
        );
    }
    
}