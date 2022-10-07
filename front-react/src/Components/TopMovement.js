import React from "react";
import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';


function TopMovement(props){

    const {_id,concept,amount,date,category,isEgress} = props.data

    return(
            <tr>
            
                <td>
                <ListGroup.Item variant={(isEgress && "danger") || (!isEgress && "success")}>{_id}</ListGroup.Item>
                </td>
                <td>
                <ListGroup.Item variant={(isEgress && "danger") || (!isEgress && "success")}>{moment(date).format('DD-MM-YYYY') || ''}</ListGroup.Item>
                    </td>
                    <td>
                    <ListGroup.Item variant={(isEgress && "danger") || (!isEgress && "success")}>{concept || ''}</ListGroup.Item>
                    </td>
                    <td>
                    <ListGroup.Item variant={(isEgress && "danger") || (!isEgress && "success")}>{category?.name || "Without Category"}</ListGroup.Item>
                    </td>
                    <td>
                    <ListGroup.Item variant={(isEgress && "danger") || (!isEgress && "success")}>${isEgress && <>-</>}{amount || ''}</ListGroup.Item>
                    </td>
              
            </tr>
    )
}

export default TopMovement