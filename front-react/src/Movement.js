import React from "react";

class Movement extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.concept || ''}</p>
                <p>{this.props.amount || ''}</p>
                <p>{this.props.isEgress || true}</p>
            </div>
        )
    }
}

export default Movement