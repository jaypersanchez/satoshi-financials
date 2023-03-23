import React, {useEffect, useState, useMemo} from 'react';
import { Button, Tabs, Tab, Container, Nav, Navbar, Form, Modal, ModalDialog } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

function App() {

  const [headlines, setHeadLines] = useState([])
  const [usdcad, setusdcad] = useState()
  const [usdjpy, setusdjpy] = useState()
  const [eurusd, seteurusd] = useState()
  const [headlinesloading,setheadlinesloading] = useState(false);
  const [usdcadrate, setUsdCadRate] = useState();
  const [usdjpyrate, setUsdJpyRate] = useState();
  const [eurusdrate, setEurUsdRate] = useState();

  const getHeadlines = async() => {
    fetch('http://localhost:3000/news')
    .then(response => response.json())
    .then(data => {
      //console.log(JSON.stringify(data))
      //iterate through JSON
      let articles = data.articles;
      setheadlinesloading(true)
      articles.forEach(headlineItem => {
        //console.log(`${headlineItem.source.name}::${headlineItem.title}::${headlineItem.url}`)
        setHeadLines(headlines => [...headlines, {source: headlineItem.source.name, headline: headlineItem.title, url:headlineItem.url }])
      })
    })
    setheadlinesloading(false)
  }

  const getCommodities = async() => {
    fetch('http://localhost:3000/commodities')
    .then(response => response.json())
    .then(data => {
        //console.log(`${JSON.stringify(data.rates.USDCAD.rate)}`)
      setUsdCadRate(data.rates.USDCAD.rate)
      setUsdJpyRate(data.rates.USDJPY.rate)
      setEurUsdRate(data.rates.EURUSD.rate)
    })
  }

  useMemo(() => {
    getCommodities();
  },[])

  useEffect(() => {
    getHeadlines();
  },[])

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            Satoshi Financials
          </p>
        </header>
      </div>
      <div className='data-content'>
          <div className='stock-exchanges'>
              <div style={{padding:'10px'}}>USA Stocks</div>
              <div style={{padding:'10px'}}>Toronto Exchange</div>
              <div style={{padding:'10px'}}>London Exchange</div>
              <div style={{padding:'10px'}}>Tokyo Stock Exchange</div>
          </div>
          <div className='stock-exchanges'>
            <div style={{padding:'10px'}}>USD/CAD {usdcadrate}</div>
            <div style={{padding:'10px'}}>USD/YEN {usdjpyrate}</div>
            <div style={{padding:'10px'}}>EUR/USD {eurusdrate}</div>
          </div>
      </div>
      <div className='news-headline'>
        <p>
        {
          
          headlines.map(headline => (
          //  console.log(headline.headline)
            headline.headline
          ))
        }
        </p>
          
      </div>
    </>
  );
}

export default App;
