import React from "react";
import { cardData, UNKNOWN_SRC } from "../data/cardData.js";
import { shuffle } from "../scripts/utils.js";
import Cards from "./Card.jsx";
import InfoZone from "./InfoZone.jsx";
import Controls from "./Controls.jsx";

import "../assets/style/card-disable.css";
import "../assets/style/memory.css";
import "../assets/style/card.css";
import CardBoard from "./CardBoard.jsx";
/*
 define root component
*/
export default class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      nb_Cards: 4,
      turnedUp: 0,
      indexTurnedUp: null,
      essai: 0,
      remainingPairs: 4,
      currentName: "???",
    };
    this.flipCard = this.flipCard.bind(this);
    this.changeNumberOfCards = this.changeNumberOfCards.bind(this);
    this.play = this.play.bind(this);
  }

  render() {
    
    return (
      <div className="memory">
        <Controls maxCards={cardData.length} play={this.play} changeNumberOfCards={this.changeNumberOfCards} remainingPairs={this.state.remainingPairs}/>

       
          <div className="cardboard"><CardBoard cards={this.state.cards} 
                                                nb_Cards={this.state.nb_Cards} 
                                                turnedUp={this.state.turnedUp} 
                                                indexTurnedUp={this.state.indexTurnedUp} 
                                                essai={this.state.essai} 
                                                remainingPairs={this.state.remainingPairs} 
                                                currentName={this.state.currentName} 
                                                flipCard={this.flipCard}/></div>
   

        <InfoZone
          essais={this.state.essai}
          remainingPairs={this.state.remainingPairs}
          nom={this.state.currentName}
        />
      </div>
    );
  }

  componentDidMount() {
    this.init_cards();
  }

  fin(){
    console.log(this.state.remainingPairs);
    if(this.state.remainingPairs<=1){
      window.alert("🥳🥳 fini felicitation 🥳🥳")
      document.location.reload();
    }
  }
  
  flipCard(index, alt) {
    const temp = this.state.cards;
    const turned = this.state.turnedUp + 1;
    const trys = this.state.essai + 1;
    temp[index].visible = true;
    if(index != this.state.indexTurnedUp){
    if (turned > 1) { /* Si une carte est déja retourné */
      if (temp[this.state.indexTurnedUp].description === alt) { /** Si ils ont la même description (c-à-d sont des pairs) */
        const pairRestantes = this.state.remainingPairs - 1;
        const endGame = (pairRestantes===0)?null:-1;
        temp[index].clickable = false;
        temp[this.state.indexTurnedUp].clickable = false;

        this.setState(() => { /** 'reset' de l'état */
          return {
            cards: temp,
            turnedUp: 0,
            indexTurnedUp: endGame,
            turnedUp: 0,
            remainingPairs: pairRestantes,
            essai: trys,
          };
        })
        this.fin();
        ;
      } else { /** Si les cartes sont différentes */
        this.setState(() => { /** Retourne la carte */
          return {
            cards: temp,
            turnedUp: turned,
            essai: trys,
            currentName: alt,
          };
        });
        setTimeout(() => { /** Remet face caché les cartes apres 2000ms */
          temp[index].visible = false;
          temp[this.state.indexTurnedUp].visible = false;
          this.setState(() => {
            return {
              cards: temp,
              indexTurnedUp: null,
              turnedUp: null,
              currentName: "???",
            };
          });
        }, 2000);
      }
    } else { /** Si pas de carte retourné  */
      this.setState(() => { /** On retourne la carte */
        return {
          cards: temp,
          turnedUp: turned,
          indexTurnedUp: index,
          currentName: alt,
        };
      });
    }
    }
  }

  play() { 
    if (this.state.indexTurnedUp != null) {
      this.allCardClickable();
    }
    else{
    this.init_cards();
    
    }
  }
  changeNumberOfCards(nombre){
    this.setState( () => {return{nb_Cards:nombre, remainingPairs:nombre, indexTurnedUp:null}});
  }

  init_cards(){
    const temp = [];
    for (let i = 0; i < this.state.nb_Cards; i++) {
      temp.push({ ...cardData[i], id: i, visible: false, clickable:false });
      temp.push({ ...cardData[i], id: i+this.state.nb_Cards, visible: false, clickable:false });
    }
    console.log(temp);
    this.setState(() => {
      return { cards: shuffle(temp), essai: 0, indexTurnedUp:-1};
    });
  }
  allCardClickable(){
    const temp = this.state.cards;
    temp.forEach( carte => carte.clickable = true);
    this.setState(()=>{return{cards:temp, indexTurnedUp:null, turnedUp:0}});
  }

}
