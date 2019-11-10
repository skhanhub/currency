// Import necessary libraries
import React from 'react';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import moment from 'moment'
// Functional component for dispaying the profit data
const ProfitTable = (props: any) => {
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr><td colSpan={2}><Moment format="DD-MMMM-YY" date={props.data.buy.date}/></td></tr>
          <tr><th colSpan={2}>{props.currency}</th></tr>
          <tr><td>Buy</td><td>Sell</td></tr>
          <tr><td>${props.data.buy.price}</td><td>${props.data.sell.price}</td></tr>
          <tr><td><Moment format="hh:mma" date={moment(props.data.buy.time, "HHmm")}/></td><td><Moment format="hh:mm a" date={moment(props.data.sell.time, "HHmm")}/></td></tr>
          <tr><td colSpan={2}>Profit: ${props.data.profit.toFixed(2)}</td></tr>
        </tbody>
      </Table>
    </div>
  )
}
// Export the component as the default object
export default ProfitTable;
