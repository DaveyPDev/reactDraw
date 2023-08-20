import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from "axios";
import './Deck.css';
import ErrorHandling from './ErrorHandling';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

async function drawCard(deck, setErrMsg, setDrawn) {
  if (!deck) return;

  const { deck_id } = deck;
  const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`;

  try {
    const drawRes = await axios.get(drawCardUrl);
    if (drawRes.data.remaining === 0) {
      throw new Error('No cards left in deck');
    }
    const card = drawRes.data.cards[0];
    const cardName = card.suit + ' ' + card.value;

    setDrawn((draw) => [
      ...draw,
      {
        id: card.code,
        name: cardName, 
        image: card.image
      }
    ]);
  } catch (err) {
    setErrMsg(err.message);
  }
}

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const [errMsg, setErrMsg] = useState(""); 
  

  useEffect(() => {
    async function getNewDeck() {
      if (!deck) {
        try {
          const newRes = await axios.get(API_BASE_URL);
          setDeck(newRes.data);
        } catch (err) {
        }
      }
    }
    getNewDeck();
  }, [deck]);

  useEffect(() => {
    const timer = autoDraw && setInterval(() => {
      drawCard(deck, setErrMsg, setDrawn);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [autoDraw, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  const cards = drawn.map((c) => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div className="Deck">
      <button className="Auto-Draw" onClick={toggleAutoDraw}>
        {autoDraw ? "STOP" : "KEEP"} Auto Draw
      </button>
      <div className="card-pile">
        <ErrorHandling errMsg={errMsg} />
        {cards}
      </div>
    </div>
  );
}

export default Deck;

