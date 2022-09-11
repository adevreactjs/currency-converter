import React from 'react';
import PropTypes from 'prop-types';

import classes from '../CurrencyInput/currencyInput.module.scss';

const CurrencyInput = ({ amount, currency, handleAmountChange, onCurrencyChange, currencies }) => {
  return (
    <div className={classes.currency}>
      <input type='text' value={amount} onChange={e => handleAmountChange(e.target.value)} />
      <select value={currency} onChange={e => onCurrencyChange(e.target.value)}>
        {currencies.map(el => (
          <option key={el.cc} value={el.cc}>
            {el.cc}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
