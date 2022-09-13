import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchCurrencyData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        await axios
          .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
          .then(response => setData(response.data))
          .then(() => setLoading(true));
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { data, error, loading };
}
