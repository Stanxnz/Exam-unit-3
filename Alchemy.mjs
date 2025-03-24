import fetch from "node-fetch";

const PLAYER_NAME = "stanv@uia.no";
const ALCHEMY_API = "https://alchemy-kd0l.onrender.com/";

function translatePlanetarySymbols(symbols) {
    const symbolsToMetals = {
      '☉':"Gold",
      '☿':"Quicksilver",
      '☽':"Silver",
      '♂':"Iron"
    };
    
    return Array.from(symbols).map(symbol => symbolsToMetals[symbol] || '');
  }

function formatMetalsList(metals) {
    return JSON.stringify(metals).replace(/","/g, '","');
  }
  
function extractCapitalLetters(poem) {
const capitals = poem.match(/\b[A-Z]/g);
return capitals ? capitals.join('') : '';
}

(async function() {
    const startUrl = `${ALCHEMY_API}start?player=${encodeURIComponent(PLAYER_NAME)}`;
    const startResponse = await fetch(startUrl);
    const startData = await startResponse.json();
    console.log("Challenge started:", startData);
})();

async function submitAnswer(answer) {
    const answerData = {
        player: PLAYER_NAME,
        answer: answer
    };
    const response = await fetch(`${ALCHEMY_API}answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerData)
    });
    const result = await response.json();
    console.log("Answer response:", result);
}

const symbols = "☉☿☽♂☉";
const metals = translatePlanetarySymbols(symbols);
const answer1 = formatMetalsList(metals);
await submitAnswer(answer1); 

const poem = "Still flows the Icy Lethe, Veiling all 'neath Eldritch Rime.";
const answer2 = extractCapitalLetters(poem);
await submitAnswer(answer2);