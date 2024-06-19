import React from "react";

export default class Timer extends React.Component {
    constructor(props){
        super(props);
        this.time=0;
        this.pair=this.props.remainingPairs;
    this.interval = setInterval(() => {
        if (this.props.isPlay){
        this.addTime();
        }else if(this.props.remainingPairs != this.pair)this.time=0;
        },1000);
    }

    addTime(){
        if (this.props.remainingPairs>0){
            this.time +=1;
        }
        document.getElementById('timer').innerHTML = this.time+' s';
    }
    

    render(){
        return(
            <div id='timer'>
                {this.time+' s'}
                </div>)
    }




}