import React from "react";

class Movement extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.data.concept || ''}</p>
                <p>{this.props.data.amount || ''}</p>
                <p>{this.props.data.date || ''}</p>
                <p>{this.props.data.categoryId || ''}</p>
                <p>{this.props.data.isEgress || true}</p>
            </div>
        )
    }
}

export default Movement