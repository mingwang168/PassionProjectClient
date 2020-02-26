import React, { Component, PropTypes } from 'react'
import {Layer,Rect,Stage,Group,Circle,Arc,Konva} from 'react-konva';


class San extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'powderblue',
            screenWidth: document.querySelector('body').offsetWidth
        };
    }
    componentDidMount() {
      window.addEventListener('resize',this.handleWidth);
    }
  componentWillUnmount(){
      window.removeEventListener('resize',this.handleWidth);
  }

  handleWidth=()=>{
      var getWidth=document.querySelector('body').offsetWidth;
      this.setState({
        screenWidth: getWidth
    });
  }
    render() {
        return (
            <div className="canvas">
            <Stage width={3000} height={200}>
                <Layer>
                <Arc
                        x={this.state.screenWidth*0.3} y={100}
                        innerRadius={90}
                        outerRadius={100}
                        strokeWidth={1}
                        angle={360}
                        rotationDeg={-90}
                        fill={"peachpuff"}
                        stroke={''}
                        />
                    <Arc
                        x={this.state.screenWidth*0.3} y={100}
                        innerRadius={90}
                        outerRadius={100}
                        strokeWidth={1}
                        angle={parseInt((this.props.learningSchedule.daysHaveLearned/this.props.learningSchedule.numberOfDay)*360)}
                        rotationDeg={-90}
                        fill={this.state.color}
                        stroke={''}
                        />

                </Layer>
            </Stage>
            <span className="sanDaysText">{this.props.learningSchedule.daysHaveLearned}</span>
            {(this.props.learningSchedule.daysHaveLearned) > 1 && <span className="sanDaysDays">days</span>}{(this.props.learningSchedule.daysHaveLearned) <= 1 && <span className="sanDaysDays">day</span>}
            </div>
        );
    }
}

export default San