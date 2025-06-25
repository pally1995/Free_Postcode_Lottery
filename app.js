import fetch from 'node-fetch';
import 'dotenv/config';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;


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

  const resultsSummary = `
    📬*Pick My Postcode Results*

    🏆 Main Draw Winner:  ${mainDraw}

    📝 Survey Draw:  ${surveyDraw}

    🎥 Video Draw:  ${videoDraw}

    💰 Stackpot Draw:  ${stackpotDraw}

    🎁 £5 Bonus:  ${fiveBonusDraw}

    🎁 £10 Bonus:  ${tenBonusDraw}
    
    🎁 £20 Bonus:  ${twentyBonusDraw}
  `;

  return resultsSummary;
};

const sendTelegramMessage = async (text) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to send telegram message: ${errorText}`);
  }
};

const run = async() => {
  try {
    const message = await winningPostcodes();
    await sendTelegramMessage(message);
    console.log("Telegram message sent!");
  } catch (error) {
    console.error('Error:', error.message);
  }
};

run();
