import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exchange from '../../assets/exchange.png';
import Header from '../../components/Header/Header';
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput';
import classes from './main.module.scss';

const Main = () => {
  const [rates, setRates] = useState([]);
  const [amountFist, setAmountFist] = useState(0);
  const [amountSecond, setAmountSecond] = useState(0);
  const [currencyFirst, setCurrencyFirst] = useState('USD');
  const [currencySecond, setCurrencySecond] = useState('EUR');
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCurrencyData() {
    try {
      await axios
        .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
        .then(response => setRates(response.data))
        .then(() => setIsLoading(true));
    } catch (error) {
      console.log(error);
    }
  }

  function changeCurrency() {
    setCurrencyFirst(currencySecond);
    setCurrencySecond(currencyFirst);
    setAmountFist(amountSecond);
    setAmountSecond(amountFist);
  }

  function formatValue(number) {
    return number.toFixed(2);
  }

  function handleAmountFistChange(amountFirst) {
    setAmountFist(amountFirst);
    let currentValueMoney = rates.filter(el => el.cc === currencyFirst);
    let currentSecondValueMoney = rates.filter(el => el.cc === currencySecond);
    if (
      !isNaN(
        formatValue((amountFirst * currentValueMoney[0].rate) / currentSecondValueMoney[0].rate),
      )
    ) {
      setAmountSecond(
        formatValue((amountFirst * currentValueMoney[0].rate) / currentSecondValueMoney[0].rate),
      );
    }
  }

  function handleCurrencyFirstChange(currencyFirst) {
    setCurrencyFirst(currencyFirst);
    let currentValueMoney = rates.filter(el => el.cc === currencyFirst);
    let currentSecondValueMoney = rates.filter(el => el.cc === currencySecond);
    setAmountSecond(
      formatValue((amountFist * currentValueMoney[0].rate) / currentSecondValueMoney[0].rate),
    );
  }

  function handleAmountSecondChange(amountSecond) {
    setAmountSecond(amountSecond);
    let currentValueMoney = rates.filter(el => el.cc === currencyFirst);
    let currentSecondValueMoney = rates.filter(el => el.cc === currencySecond);

    if (
      !isNaN(
        formatValue((amountSecond * currentSecondValueMoney[0].rate) / currentValueMoney[0].rate),
      )
    ) {
      setAmountFist(
        formatValue((amountSecond * currentSecondValueMoney[0].rate) / currentValueMoney[0].rate),
      );
    }
  }

  function handleCurrencySecondChange(currencySecond) {
    setCurrencySecond(currencySecond);
    let currentValueMoney = rates.filter(el => el.cc === currencyFirst);
    let currentSecondValueMoney = rates.filter(el => el.cc === currencySecond);
    setAmountFist(
      formatValue((amountSecond * currentSecondValueMoney[0].rate) / currentValueMoney[0].rate),
    );
  }

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  return (
    <div className={classes.main}>
      <h1>Currency Converter</h1>
      <Header currencyData={rates} isLoading={isLoading} />
      <div>
        <CurrencyInput
          handleAmountChange={handleAmountFistChange}
          onCurrencyChange={handleCurrencyFirstChange}
          amount={amountFist}
          currency={currencyFirst}
          currencies={rates}
        />
      </div>
      <div>
        <img src={exchange} alt='exchange' onClick={changeCurrency}></img>
      </div>
      <div>
        <CurrencyInput
          handleAmountChange={handleAmountSecondChange}
          onCurrencyChange={handleCurrencySecondChange}
          amount={amountSecond}
          currency={currencySecond}
          currencies={rates}
        />
      </div>
    </div>
  );
};

export default Main;
