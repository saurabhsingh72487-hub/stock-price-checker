## Summary

Fixed the stock price API issue and frontend display bug.

## Changes

- Fixed stock API response handling
- Corrected frontend data path from `data.price` to `data.stockData.price`
- Added cache-busting for `script.js`
- Fixed undefined values showing in frontend
- Updated README documentation

## Issue Fixed

Closes #<issue-number>

## Testing

Tested locally with:

- `/api/stock-prices?stock=AAPL`
- `/api/stock-prices?stock=AAPL&like=true`
- `/api/stock-prices?stock=AAPL&stock=GOOG`

Frontend now displays:

- Stock symbol
- Stock price
- Likes / relative likes
