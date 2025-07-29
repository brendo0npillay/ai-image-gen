const myImg = document.querySelector(".imgPlaceholder");
const myBtn = document.getElementById("genBtn");
const userInp = document.getElementById("prompt");
const recents = document.getElementById("recents");
const errorTxt = document.querySelector(".error");

const allImgs = [];

function generateImage(prompt) {
  const url = "https://pollinations.ai/prompt/" + encodeURIComponent(prompt);

  myImg.innerHTML = `<div class="spinner"></div>`;

  const img = new Image();
  img.src = url;
  img.alt = prompt;
  img.className = "genImg";

  img.onload = () => {
    myImg.innerHTML = "";
    myImg.appendChild(img);
    allImgs.push({ id: allImgs.length, link: url, prompt: prompt });
    errorTxt.textContent = "";
  };

  img.onerror = () => {
    myImg.innerHTML = `<div class="error">Failed to Load Image</div>`;
  };
}

myBtn.onclick = () => {
  event.preventDefault();
  if (userInp.value.trim() === "") {
    errorTxt.textContent = "enter a prompt";
  } else {
    const prompt = userInp.value;
    generateImage(prompt);
    recents.innerHTML = allImgs.map(
      (url) =>
        `<img class="pastGenImg" src=${url.link} alt=${url.prompt} data-id=${url.id}/>`
    );
    document.querySelectorAll(".pastGenImg").forEach((imgEl) => {
      imgEl.onclick = () => {
        const url = imgEl.getAttribute("src");
        const prompt = imgEl.getAttribute("alt");
        myImg.innerHTML = `<img class="genImg" src=${url} alt=${prompt}/>`;
      };
    });
    userInp.value = "";
  }
};
