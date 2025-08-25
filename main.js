const API_KEY = "fca_live_1djPFmwr79ssDnB0XbqC1HpzqBU5gyyhw1gBByzn";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  // ✅ Correct FreeCurrencyAPI URL
  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error("API request failed");

    let data = await response.json();
    let rate = data.data[to];

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.error(error);
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countrCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countrCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
