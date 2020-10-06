import React from "react";
import './resultContainer.css';
import CountUp from "react-countup";

class ResultContainer extends React.Component {

    displayResult = () => {
        if (this.props.num === 'NAN') {
            return <p>{this.props.text}</p>
        } else {
            return <p><span><CountUp end={this.props.num}/></span>{this.props.text}</p>
        }
    }

    render() {
        return (
            <div className="resultContainer">
                <h3>{this.props.title}</h3>
                {this.displayResult()}
            </div>
        );
    }
}

export default ResultContainer;