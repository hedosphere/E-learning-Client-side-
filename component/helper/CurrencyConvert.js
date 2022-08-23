export const CurrencyFormatter = (data) => {
  return ((data.amount * 10) / 10).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

// (data.amount * 100/ 100)
