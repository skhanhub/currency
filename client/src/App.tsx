import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import DateForm from './components/DateForm';
import ProfitTable from './components/ProfitTable';

interface IState {
  fromDate: string;
  toDate: string;
  currencyList: string[];
  currencySelected: string[];
}
interface IProfit {
  [key: string]: object;
}

const App: React.FC = () => {

  const [state, setState] = useState<IState>({
    fromDate: '2018-05-07',
    toDate: '2018-05-08',
    currencyList: [],
    currencySelected: []
  })

  const [profit, setProfit] = useState<IProfit>({});
  const [showBuyDate, setShowBuyDate] = useState<boolean>(false);

  useEffect(()=>{
    getCurrencies();
  }, [])

  useEffect(()=>{
    getProfits();
  }, [state])

  // Async function for fetching the currency name list
  const getCurrencies = async () =>{
    let data: any = await fetch('/api/currencies');
    data = await data.json();
    setState({
      ...state,
      currencyList: data,
      currencySelected: data
    })
  }

  // Async function for fetching profits for a given currency list and day interval
  const getProfits = async () =>{
    const postData = {
      fromDate: state.fromDate.split('-').join(''),
      toDate: state.toDate.split('-').join(''),
      currencySelected: state.currencySelected
    }
    let data: any = await fetch('/api/profits', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postData), // body data type must match "Content-Type" header
    });
    data = await data.json();
    setProfit(data)
  }
  // Function for handleing onChange of the Show Buy Date input field
  const ChangeShowBuyDate = (e: any)=>{
    setShowBuyDate(e.target.checked)
  }
  // Function for handleing onChange of the fromDate input field
  const newFromDate = async (e: any)=>{
    setState({...state, fromDate: e.target.value })
  }
  // Function for handleing onChange of the toDate input field
  const newToDate = async (e: any)=>{
    setState({...state, toDate: e.target.value })
  }
  // Function for handleing onChange of the currency select input field
  const newCurrencySelected = async (selected: any)=>{

    setState({
      ...state,
      currencySelected: selected.map((currency: {value: string, label: string})=>{
        return currency.value
      })
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1 style={{margin: '50px'}}>Currency Analyser</h1>
        </Container>
        <Container>
          <Row>
            <DateForm
              ChangeShowBuyDate={ChangeShowBuyDate}
              newFromDate={newFromDate}
              newToDate={newToDate}
              fromDate={state.fromDate}
              toDate={state.toDate}
              currencyList={state.currencyList}
              newCurrencySelected={newCurrencySelected}
              currencySelected={state.currencySelected}
            />
          </Row>
        </Container>&nbsp;&nbsp;
        <Container>
          <Row className="justify-content-md-center">
          {Object.keys(profit).map(
            (currency: string, i: number)=>{
              return(
                <Col key={i} sm="4">
                  <ProfitTable
                    showBuyDate={showBuyDate}
                    data={profit[currency]}
                    currency={currency}
                  />
                </Col>
              )
            }
          )}
          </Row>
        </Container>

      </header>
    </div>
  );
}

export default App;
