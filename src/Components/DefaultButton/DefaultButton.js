import React from "react";
import './defaultButton.css'

class DefaultButton extends React.Component {

    render() {
        return (
            <div>
                <button className="defaultBtn" onClick={this.props.action}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}

export default DefaultButton
