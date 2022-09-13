import React, { useState } from 'react';
import exchange from '../../assets/exchange.png';
import Header from '../../components/Header/Header';
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput';
import useFetchCurrencyData from '../../services/hooks/useFetchCurrencyData';
import classes from './main.module.scss';

const Main = () => {
  const [amountFist, setAmountFist] = useState(0);
  const [amountSecond, setAmountSecond] = useState(0);
  const [currencyFirst, setCurrencyFirst] = useState('USD');
  const [currencySecond, setCurrencySecond] = useState('EUR');
  const { data, loading } = useFetchCurrencyData();

  function changeCurrency() {
    setCurrencyFirst(currencySecond);
    setCurrencySecond(currencyFirst);
    setAmountFist(amountSecond);
    setAmountSecond(amountFist);
  }

  function formatValue(number) {
    return number.toFixed(2);
  }

  function getRate(currency) {
    const currentValueMoney = data.filter(el => el.cc === currency);
    return currentValueMoney[0].rate;
  }

  function handleAmountFistChange(amountFirst) {
    const inputValue = Number(amountFirst);
    if (inputValue || inputValue === 0) {
      setAmountFist(inputValue);
      const currentValueMoney = getRate(currencyFirst);
      const currentSecondValueMoney = getRate(currencySecond);
      setAmountSecond(formatValue((inputValue * currentValueMoney) / currentSecondValueMoney));
    }
  }

  function handleCurrencyFirstChange(currencyFirst) {
    setCurrencyFirst(currencyFirst);
    let currentValueMoney = getRate(currencyFirst);
    let currentSecondValueMoney = getRate(currencySecond);
    setAmountSecond(formatValue((amountFist * currentValueMoney) / currentSecondValueMoney));
  }

  function handleAmountSecondChange(amountSecond) {
    const inputValue = Number(amountSecond);
    if (inputValue || inputValue === 0) {
      setAmountSecond(amountSecond);
      let currentValueMoney = getRate(currencyFirst);
      let currentSecondValueMoney = getRate(currencySecond);
      setAmountFist(formatValue((amountSecond * currentSecondValueMoney) / currentValueMoney));
    }
  }

  function handleCurrencySecondChange(currencySecond) {
    setCurrencySecond(currencySecond);
    let currentValueMoney = getRate(currencyFirst);
    let currentSecondValueMoney = getRate(currencySecond);
    setAmountFist(formatValue((amountSecond * currentSecondValueMoney) / currentValueMoney));
  }

  return (
    <div className={classes.main}>
      <h1>Currency Converter</h1>
      <Header currencyData={data} isLoading={loading} />
      <div>
        <CurrencyInput
          handleAmountChange={handleAmountFistChange}
          onCurrencyChange={handleCurrencyFirstChange}
          amount={amountFist}
          currency={currencyFirst}
          currencies={data}
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
          currencies={data}
        />
      </div>
    </div>
  );
};

export default Main;
