import React from "react";
import ResultContainer from "./ResultContainer/ResultContainer";

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupValue: '',
            countValue: 0,
            speedValue: 0
        }
    }

    componentDidMount() {
        this.setState({
            groupValue: this.props.groupValue,
            countValue: this.props.countValue,
            speedValue: this.props.speedValue
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.groupValue !== this.props.groupValue ||
        prevProps.countValue !== this.props.countValue ||
        prevProps.speedValue !== this.props.speedValue) {
            this.setState({
                groupValue: this.props.groupValue,
                countValue: this.props.countValue,
                speedValue: this.props.speedValue
            })
        }
    }

    render() {
        return (
            <div className="col-sm-12">
                <h2>RESULTS</h2>
                <ResultContainer
                    num='NAN'
                    text={this.state.groupValue}
                    title='Top Group'
                />
                <ResultContainer
                    num={this.state.countValue}
                    text=''
                    title='Group Count'
                />
                <ResultContainer
                    num={this.state.speedValue}
                    text='ms'
                    title='Performance Speed'
                />
            </div>
        );
    }
}

export default Results