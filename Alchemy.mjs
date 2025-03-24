import fetch from "node-fetch";

const PLAYER_NAME = "stanv@uia.no";
const ALCHEMY_API = "https://alchemy-kd0l.onrender.com/";

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

const answer = ["Gold", "Quicksilver", "Silver", "Iron", "Gold"];

const answerResponse = await fetch(`${ALCHEMY_API}answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, player: PLAYER_NAME })
  });
  const answerResult = await answerResponse.json();
  console.log("Submission result:", answerResult);