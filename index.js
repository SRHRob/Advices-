const button = document.getElementById("button");
const bubble = document.getElementById("speech");

function stripHTMLTags(text) {
  return text.replace(/<.*?>/g, "");
}

function readAdvice(adviceNumber, adviceText) {
  const cleanAdviceText = stripHTMLTags(adviceText);
  VoiceRSS.speech({
    key: "5ff4b1b6ab8143f488a977bc3a2f2a9c",
    src: `ADVICE: #${adviceNumber}\n${cleanAdviceText}`,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const adviceNumber = data.slip.id;
    const adviceText = data.slip.advice;
    const adviceContent = `
    <p><strong><span style="color: #53FFAB;">ADVICE:</span></strong> <span style="color: #53FFAB;">#${adviceNumber}</span></p>
    <p>${adviceText}</p>
  `;
    bubble.innerHTML = adviceContent;
    readAdvice(adviceNumber, adviceText);
  } catch (e) {
    console.error("Error fetching advice:", e);
  }
}

const image = document.getElementById("button");
let rotationAngle = 0;

image.addEventListener("click", () => {
  rotationAngle += 45;
  image.style.transform = `rotate(${rotationAngle}deg)`;
});

button.addEventListener("click", getAdvice);
