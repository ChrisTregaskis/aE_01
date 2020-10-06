import React from "react";
import PerformanceAverageContainer from "./PerformanceAverageContainer/PerformanceAverageContainer";

class PerformanceAverages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            binaryAverage: 0,
            linearAverage: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.binaryClickCount !== this.props.binaryClickCount) {
            this.updateAverage('binary', this.props.binarySpeedAll)
        } else if (prevProps.linearClickCount !== this.props.linearClickCount) {
            this.updateAverage('linear', this.props.linearSpeedAll)
        }
    }

    updateAverage = (stateOption, searchSpeedResultsArray) => {
        let avg = searchSpeedResultsArray.reduce((a, b) => a + b, 0) / searchSpeedResultsArray.length
        if (stateOption === 'binary') {
            this.setState({ binaryAverage: parseInt(avg) })
        } else if (stateOption === 'linear') {
            this.setState({ linearAverage: parseInt(avg) })
        }
    }

    render() {
        return (
            <div className="col-sm-12">
                <PerformanceAverageContainer
                    num={this.state.binaryAverage}
                    title='Binary Performance Average'
                />
                <PerformanceAverageContainer
                    num={this.state.linearAverage}
                    title='Linear Performance Average'
                />
            </div>
        );
    }
}

export default PerformanceAverages;