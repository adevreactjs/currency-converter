import React from 'react';
import classes from './header.module.scss';

const Header = ({ currencyData, isLoading }) => {
  function filterCurrency(currency) {
    const currencyUsd = currencyData.filter(el => el.cc === currency);
    return currencyUsd;
  }
  return (
    <header className={classes.header}>
      <div className={classes.header__items}>
        <div className={classes.header__item}>
          {isLoading && `${filterCurrency('USD')[0].txt}:`}
        </div>
        <div className={classes.header__item}>
          {isLoading && `${filterCurrency('USD')[0].rate.toFixed(2)} грн.`}
        </div>
      </div>
      <div className={classes.header__items}>
        <div className={classes.header__item}>
          {isLoading && `${filterCurrency('EUR')[0].txt}:`}
        </div>
        <div className={classes.header__item}>
          {isLoading && `${filterCurrency('EUR')[0].rate.toFixed(2)} грн.`}
        </div>
      </div>
    </header>
  );
};

export default Header;
