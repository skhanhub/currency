// Import necessary libraries
import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import './slider.css'

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: 'black',
    padding: 20,
  }),
}
const commonStyle = {height: '4rem'};
// Functional component for dispaying the form
const DateForm = (props: any) => {

  return (
    <form>
      <Form.Row>
      <Col>
      <Form.Label>From Date</Form.Label>
          <input
            style={commonStyle}
            type="date"
            value={props.fromDate}
            onChange={props.newFromDate} />
      </Col>
      <Col>
        <Form.Label>To Date</Form.Label>
          <input
            style={commonStyle}
            type="date"
            value={props.toDate}
            onChange={props.newToDate} />
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Currencies</Form.Label>
            <Select
              style={commonStyle}
              styles={customStyles}
              isMulti
              isSearchable
              onChange={props.newCurrencySelected}
              options={props.currencyList.map((currency: string)=>{
                return { value: currency, label: currency }
              })}
            />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label style={{fontSize: "2rem"}}>Show Buy Date</Form.Label>
          {/* <Form.Check type="checkbox" /> */}
          <label className="switch">
            <input type="checkbox" onChange={props.ChangeShowBuyDate}/>
            <span className="slider round"></span>
          </label>
        </Form.Group>
      </Col>
      </Form.Row>
    </form>
  )
}
// Export the component as the default object
export default DateForm;
