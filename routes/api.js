"use strict";

const express = require("express");
const router = express.Router();

const likes = {};

async function getPrice(symbol) {
  const url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol.toLowerCase()}/quote`;

  const response = await fetch(url);
  const data = await response.json();

  console.log("API DATA:", data);

  if (!data || data === "Unknown symbol" || !data.latestPrice) {
    return "N/A";
  }

  return data.latestPrice;
}

router.get("/stock-prices", async function (req, res) {
  try {
    let { stock, like } = req.query;

    if (!stock) {
      return res.status(400).json({ error: "stock required" });
    }

    const stocks = Array.isArray(stock) ? stock : [stock];

    const symbols = stocks
      .slice(0, 2)
      .map((s) => String(s).trim().toUpperCase());

    const ip = req.ip || req.socket.remoteAddress || "unknown";

    const stockData = await Promise.all(
      symbols.map(async function (symbol) {
        const price = await getPrice(symbol);

        if (!likes[symbol]) {
          likes[symbol] = new Set();
        }

        if (like === "true") {
          likes[symbol].add(ip);
        }

        return {
          stock: symbol,
          price: price,
          likes: likes[symbol].size,
        };
      })
    );

    if (stockData.length === 1) {
      return res.json({
        stockData: stockData[0],
      });
    }

    return res.json({
      stockData: [
        {
          stock: stockData[0].stock,
          price: stockData[0].price,
          rel_likes: stockData[0].likes - stockData[1].likes,
        },
        {
          stock: stockData[1].stock,
          price: stockData[1].price,
          rel_likes: stockData[1].likes - stockData[0].likes,
        },
      ],
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;