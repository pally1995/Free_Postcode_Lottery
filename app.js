import fetch from 'node-fetch';

const winningPostcodes = async () => {
  const response = await fetch(`https://pickmypostcode.com/api/index.php/entry/ref/refurl/campaign/21674/cid/landing/?_=${Date.now()}`); 
  const json = await response.json();

  //result path
  const results = json.data.drawResults;

  //draw results
  const mainDraw = results.main.result;
  const surveyDraw = results.survey.result;
  const videoDraw = results.video.result;
  const stackpotDraw = results.stackpot.result;
  const fiveBonusDraw = results.bonus.five.result;
  const tenBonusDraw = results.bonus.ten.result;
  const twentyBonusDraw = results.bonus.twenty.result;

  console.log("The main draw winner is: ", mainDraw);
  console.log("The survey draw winner is: ", surveyDraw);
  console.log("The video draw winner is: ", videoDraw);
  console.log("The stackpot draw winners are: ", stackpotDraw);
  console.log("The £5 bonus draw winner is: ", fiveBonusDraw);
  console.log("The £10 bonus draw winner is: ", tenBonusDraw);
  console.log("The £20 bonus draw winner is: ", twentyBonusDraw);
};

winningPostcodes();