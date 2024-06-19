import react from "react";
import "../assets/style/card.css";
import "../assets/style/card-disable.css";

export default class Card extends react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = ( !this.props.clickable || this.props.turnedUp>1)?"card-disable":"card";
    return (
      <img
        src={(this.props.visible)?this.props.src:this.props.Unknown}
        alt={this.props.desc}
        className={className}
        onClick={() => this.props.flip(this.props.index, this.props.desc)}
      />
    );
  }
}