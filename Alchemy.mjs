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

function translateNumberToLetter(code) {
    const translation = {
        1: "E",
        2: "F",
        4: "I",
        5: "G",    
        8: "S",
        9: "P",
        10: "H",
        12: "L",
        17: "T",
        20: "O",
        23: "R",
        24: "A",
        29: "B",
        34: "N",
        38: "M",
        45: "U",
        46: "X",
        48: "V",
        127: "C",
        108: "Y",  
        131: "D",  
        270: "W"
    };
  
    return translation[code] || '';
  }

  function decodeMessage(codes) {
    return codes
      .map(group => {
        if (typeof group === "string") {
          return group;
        } else {
          return group.map(num => translateNumberToLetter(num)).join('');
        }
      })
      .join(' ');
  }
  
  const codeForChallenge3 = [
    [17, 20],
    [20, 29, 17, 24, 4, 34],
    [24, 127, 127, 1, 8, 8],
    [17, 20],
    [17, 10, 1],
    [34, 1, 46, 17],
    [48, 24, 45, 12, 17],
    [4, 34, 9, 45, 17],
    [17, 10, 1],
    [2, 20, 23, 38, 45, 12, 24],
    [2, 20, 23],
    [17, 10, 1],
    [2, 20, 45, 23, 17, 10],
    [1, 12, 1, 38, 1, 34, 17],
    [127, 20, 38, 29, 4, 34, 1],
    [38, 1, 23, 127, 45, 23, 108],
    [127, 20, 9, 9, 1, 23],
    [24, 34, 131],
    [8, 45, 12, 2, 45, 23],
    [20, 48, 1, 23],
    [10, 1, 24, 17],
    [24, 131, 131],
    [8, 24, 12, 17],
    [24, 34, 131],
    [270, 24, 17, 1, 23],
    [4, 34, 2, 45, 8, 1],
    [5, 20, 12, 131],
    [17, 10, 23, 20, 45, 5, 10],
    [24, 4, 23]
  ];

function getFourthElement(){
  const translateElements = {
    mercury: "☿",
    copper: "♀",
    sulfur: "🜍",
    fire: "🜂",
    salt: "🜔",
    water: "🜄",
    gold: "☉",
    air: "🜁"
  }
  const fourthElement = translateElements.mercury + translateElements.copper + translateElements.sulfur + translateElements.fire + translateElements.salt + translateElements.water + translateElements.gold + translateElements.air;
  return fourthElement;
}

function decodeChallenge4(){
  return ["ALPHABET"]
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

const answerToCode = decodeMessage(codeForChallenge3);
console.log("Decrypted message:", answerToCode)
const answer3 = getFourthElement();
await submitAnswer(answer3);

const challenge4Story = `
through Hidden experiments, the Observing Philosophers 
carefully recorded their findings in secret tomes. 
rarely did alchemists Seek answers in mundane texts, 
for the Universal substance eluded ordinary understanding.

beyond the limits of ordinary Methods, the most Dedicated scholars 
turned to alchemical science, where hidden truths awaited discovery. 
Truly, the masters of old knew that one must strive tirelessly, 
purifying Lead into something greater, refining both mind and matter. 
until mastery was achieved, Knowledge alone was insufficient, 
and only those who understood the deeper mysteries Would glimpse Immortality.

secrets, carefully veiled Behind Cryptic inscriptions, 
teach those with patience to decode their deeper meaning. 
hermetic ideals demand perseverance, a willingness to question, 
and an acceptance that the path to wisdom is rarely direct. 
long nights spent in study and contemplation lead to illumination, 
and oaths taken by true seekers bind them to their Noble quest. 
Yet the philosophers stone remains Elusive, 
and only through great sacrifice is the truth Revealed.

elixirs, said to restore itality and even grant eternal youth, 
were concocted by those who dared to challenge natures limits. 
distillations, performed under the guidance of celestial alignments, 
promised insight beyond mortal comprehension. 
Gold, though treasured by the common man, held greater meaning 
to those who understood the principle of transmutation. 
Joining knowledge of the material and the divine, 
true alchemists saw wealth not in metal, but in enlightenment.

notable are those who pursued the Quintessence, 
a substance believed to bind together the four classical elements. 
wielders of this hidden force were said to shape reality itself, 
while Xenon and other elusive Vapors symbolized the mysteries of the aether. 
yields of failed experiments were many, 
but each failure brought the dedicated scholar closer to true wisdom. 
Zeal alone was not enough—patience, discipline, and intellect 
were the true keys to unlocking the universes greatest secret.

through the Forgotten knowledge of Ancient scholars, 
keepers of wisdom have safeguarded the elusive 
keys to transformation. only those who 
fully commit to the pursuit of enlightenment 
can grasp the final mysteries.
`;
const capitalsFromChallenge4Story = extractCapitalLetters(challenge4Story);
console.log(capitalsFromChallenge4Story);
const answer4 = decodeChallenge4();
await submitAnswer(answer4);