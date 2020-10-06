import React from "react";
import './performanceAverageContainer.css';
import CountUp from "react-countup";

class PerformanceAverageContainer extends React.Component {
    render() {
        return (
            <div className="PerformanceAverageContainer">
                <h3>{this.props.title}</h3>
                <p><span><CountUp end={this.props.num}/></span>ms</p>
            </div>
        );
    }
}

export default PerformanceAverageContainer;