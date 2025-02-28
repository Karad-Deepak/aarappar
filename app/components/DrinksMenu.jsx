"use client";

import { motion } from "framer-motion";
import React from "react";

// Hardcoded drinks data (example data)
const drinksData = [
  {
    name: "BECKS",
    category: "BEERS",
    volumes: [{ volume: "0,33 L", price: "3,50 €" }],
  },
  {
    name: "BECKS",
    category: "BEERS",
    volumes: [{ volume: "0,5 L", price: "4,50 €" }],
  },

  {
    name: "ALCOHOL FREE BEER	",
    category: "BEERS",
    volumes: [{ volume: "0,5 L", price: "4,50 €" }],
  },
  {
    name: "CORONA EXTRA",
    category: "BEERS",
    volumes: [{ volume: "0,33 L", price: "3,90 €" }],
  },

  {
    name: "WEISEN BIER (ERDINGER)",
    category: "BEERS",
    volumes: [{ volume: "0,5 L", price: "4,50 €" }],
  },
  {
    name: "ROTWEIN",
    category: "WEIN",
    volumes: [{ volume: "0,2 L", price: "4,50 €" }],
  },
  {
    name: "WEIßWEIN",
    category: "WEIN",
    volumes: [{ volume: "0,2 L", price: "4,50 €" }],
  },
  {
    name: "ROSEWEIN",
    category: "WEIN",
    volumes: [{ volume: "0,2 L", price: "4,50 €" }],
  },
  {
    name: "RED LABEL",
    category: "WHISKEY",
    volumes: [
      { volume: "0,2 cl", price: "2,50 €" },
      { volume: "0,4 cl", price: "4,50 €" },
    ],
  },
  {
    name: "BALLANTINE",
    category: "WHISKEY",
    volumes: [
      { volume: "0,2 cl", price: "2,50 €" },
      { volume: "0,4 cl", price: "4,50 €" },
    ],
  },
  {
    name: "JACK DANIEL",
    category: "WHISKEY",
    volumes: [
      { volume: "0,2 cl", price: "2,90 €" },
      { volume: "0,4 cl", price: "5,50 €" },
    ],
  },
  {
    name: "CHIVAS REGAL",
    category: "WHISKEY",
    volumes: [
      { volume: "0,2 cl", price: "3,00 €" },
      { volume: "0,4 cl", price: "6,00 €" },
    ],
  },
  {
    name: "GLENFIDDICH",
    category: "WHISKEY",
    volumes: [
      { volume: "0,2 cl", price: "3,50 €" },
      { volume: "0,4 cl", price: "6,50 €" },
    ],
  },
  {
    name: "BACARDI WHITE",
    category: "RUM",
    volumes: [
      { volume: "0,2 cl", price: "2,50 €" },
      { volume: "0,4 cl", price: "4,50 €" },
    ],
  },
  {
    name: "OLD MUNK",
    category: "RUM",
    volumes: [
      { volume: "0,2 cl", price: "2,90 €" },
      { volume: "0,4 cl", price: "5,50 €" },
    ],
  },
  {
    name: "CHANTRE",
    category: "BRANDY",
    volumes: [
      { volume: "0,2 cl", price: "2,00 €" },
      { volume: "0,4 cl", price: "4,00 €" },
    ],
  },
  {
    name: "TEQUILLA",
    category: "SHOOTERS",
    volumes: [{ volume: "0,2 cl", price: "2,50 €" }],
  },
  {
    name: "OUZO",
    category: "SHOOTERS",
    volumes: [{ volume: "0,2 cl", price: "2,50 €" }],
  },
  {
    name: "WODKA",
    category: "SHOOTERS",
    volumes: [{ volume: "0,2 cl", price: "2,50 €" }],
  },
  {
    name: "JÄGERMEISTER",
    category: "SHOOTERS",
    volumes: [{ volume: "0,2 cl", price: "3,50 €" }],
  },
  {
    name: "CHANTRE - COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "4,90 €" }],
  },
  {
    name: "WODKA - TONIC",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "5,50 €" }],
  },
  {
    name: "RED LABEL - COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "5,50 €" }],
  },
  {
    name: "BALLANTINE – COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "5,50 €" }],
  },
  {
    name: "OLD MUNK – COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "5,90 €" }],
  },
  {
    name: "JACK DANIEL - COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "5,90 €" }],
  },
  {
    name: "CHIVAS REGAL - COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "6,50 €" }],
  },
  {
    name: "GLENFIDDICH - COLA",
    category: "LONG DRINKS",
    volumes: [{ volume: "0,4 cl", price: "7,50 €" }],
  },
];

// Helper function to group items by category
const groupByCategory = (data) =>
  data.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

export default function DrinksMenu() {
  const grouped = groupByCategory(drinksData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-8">
        Drinks Menu
      </h1>
      {Object.entries(grouped).map(([category, items]) => (
        <details
          key={category}
          className="mb-6 lg:mb-9 border border-gray-300 rounded-lg overflow-hidden"
        >
          <summary className="cursor-pointer px-4 py-2 lg:px-10 bg-gray-200 hover:bg-gray-300 transition-colors text-lg lg:text-xl font-semibold text-normalbg">
            {category}
          </summary>
          <div className="px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((drink) => (
                <motion.div
                  key={drink.name}
                  className="p-4 border rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 bg-white"
                >
                  <div className="mb-2">
                    <span className="font-bold text-zinc-800">
                      {drink.name}
                    </span>
                  </div>
                  <div>
                    {drink.volumes.map((v, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{v.volume}</span>
                        <span className="font-bold text-indigo-600 font-sans">
                          {v.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
