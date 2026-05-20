const apiDebtsLink = "https://debt-tracking.onrender.com/api/dettes";
const apiCreancesLink = "https://debt-tracking.onrender.com/api/creances";
// import mongoose from "mongoose";
// mongoose
//   .connect("mongodb://localhost/financestrack")
//   .then(console.log("Connexion Etablie"));
// import Creances from "./Scripts/Databases/Schemas/Creances.js";
// import Debts from "./Scripts/Databases/Schemas/Dettes.js";

// run();
// async function run() {
//   const creance = await Creances.create({
//     person: "Cheikh Sadibou Diop",
//     amount: 400,
//     descrip: "Achat de Souseul et de sow",
//   });
//   await creance.save();
// }
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}

document.getElementById('overlay').addEventListener('click', toggleSidebar)
document.getElementById('burger').addEventListener('click', toggleSidebar)

window.addEventListener("load", async () => {
  setInterval(() => {
    getDebtsData();
    getCreancesData();
    calculateAmount();
  }, 1000);
  // console.log(firstDebtName);
});

const addDebt = document.getElementById("add-debt");
// console.log(addDebt)
addDebt.addEventListener("click", async function () {
  const mainClass = document.getElementsByClassName("main");
  const form = document.createElement("form");
  form.setAttribute("class", "addDebtForm");
  form.setAttribute("action", "http:localhost:8080/api/dettes")
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Entrez le nom");

  const amountInput = document.createElement("input");
  amountInput.setAttribute("type", "number");
  amountInput.setAttribute("placeholder", "Entrez le montant de la dette");

  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("placeholder", "Entrez une description");

  form.append(nameInput, amountInput, descriptionInput);
  mainClass[0].append(form)
  console.log(form);
});

async function getDebtsData() {
  const debtsCountSlot = document.getElementsByClassName("countDebt");
  const firstdebtavatar = document.getElementById("firstdebtavatar");
  const seconddebtavatar = document.getElementById("seconddebtavatar");
  const debtSectionCount = document.getElementsByClassName("numberDebts");
  // console.log(seconddebtavatar.textContent);
  const firstDebtName = document.getElementById("firstDebtUser");
  const secondDebtName = document.getElementById("secondDebtUser");
  const firstDebtMoney = document.getElementById("firstDebtAmount");
  const secondDebtMoney = document.getElementById("secondDebtAmount");
  const firstDate = document.getElementById("firstDebtDate");
  const secondDate = document.getElementById("secondDebtDate");

  const debtsData = await axios.get(apiDebtsLink);

  const debtCount = debtsData.data.length;
  debtsCountSlot[0].textContent = `${debtCount} actives`;
  debtSectionCount[0].textContent = debtCount
  const firstDebtUserName = debtsData.data[0].person;
  const firstDebtAmount = debtsData.data[0].amount;
  const secondDebtUserName = debtsData.data[1].person;
  const secondDebtAmount = debtsData.data[1].amount;

  const firstDebtUserAvatar = debtsData.data[0].person
    .slice(0, 2)
    .toUpperCase();
  const firstDebtDate = debtsData.data[0].date;
  const secondDebtUserAvatar = debtsData.data[1].person
    .slice(0, 2)
    .toUpperCase();
  const secondDebtDate = debtsData.data[1].date;

  firstdebtavatar.textContent = `${firstDebtUserAvatar}`;
  seconddebtavatar.textContent = `${secondDebtUserAvatar}`;
  firstDebtName.textContent = firstDebtUserName;
  firstDebtMoney.textContent = firstDebtAmount + " F";
  secondDebtName.textContent = secondDebtUserName;
  secondDebtMoney.textContent = secondDebtAmount + " F";
  firstDate.textContent = `${new Date(firstDebtDate).getDate().toString().padStart(2, 'O')}/${new Date(firstDebtDate).getMonth().toString().padStart(2, '0')}/${new Date(firstDebtDate).getFullYear()}`;
  secondDate.textContent = `${new Date(secondDebtDate).getDate().toString().padStart(2, 'O')}/${new Date(secondDebtDate).getMonth().toString().padStart(2, '0')}/${new Date(secondDebtDate).getFullYear()}`;
}

async function getCreancesData() {
  const creancesData = await axios.get(apiCreancesLink);
  const creancesCountSlot = document.getElementsByClassName("countCreances");
  const creancesCount = creancesData.data.length;
  creancesCountSlot[0].textContent = `${creancesCount} actives`;
  const firstCreancesavatar = document.getElementById("firstCreancesavatar");
  const secondCreancesavatar = document.getElementById("secondCreancesavatar");
  // console.log(seconddebtavatar.textContent);
  const firstCreancesName = document.getElementById("firstCreancesUser");
  const secondCreancesName = document.getElementById("secondCreancesUser");
  const firstCreancesMoney = document.getElementById("firstCreancesAmount");
  const secondCreancesMoney = document.getElementById("secondCreancesAmount");
  const firstDate = document.getElementById("firstCreanceDate");
  const secondDate = document.getElementById("secondCreanceDate");

  const firstCreancesUserName = creancesData.data[0].person;
  const firstCreancesAmount = creancesData.data[0].amount;
  const secondCreancesUserName = creancesData.data[1].person;
  const secondCreancesAmount = creancesData.data[1].amount;
  const firstCreanceDate = creancesData.data[0].date;
  const secondCreanceDate = creancesData.data[1].date;

  const firstCreancesUserAvatar = creancesData.data[0].person
    .slice(0, 2)
    .toUpperCase();
  const firstCreancesDescription = creancesData.data[0].descrip;
  const secondCreancesUserAvatar = creancesData.data[1].person
    .slice(0, 2)
    .toUpperCase();
  const secondCreancesDescription = creancesData.data[1].descrip;

  firstCreancesavatar.textContent = `${firstCreancesUserAvatar}`;
  secondCreancesavatar.textContent = `${secondCreancesUserAvatar}`;
  firstCreancesName.textContent = firstCreancesUserName;
  firstCreancesMoney.textContent = firstCreancesAmount + " F";
  secondCreancesName.textContent = secondCreancesUserName;
  secondCreancesMoney.textContent = secondCreancesAmount + " F";
  firstDate.textContent = `${new Date(firstCreanceDate).getDate().toString().padStart(2, 'O')}/${new Date(firstCreanceDate).getMonth().toString().padStart(2, '0')}/${new Date(firstCreanceDate).getFullYear()}`;
  secondDate.textContent = `${new Date(secondCreanceDate).getDate().toString().padStart(2, 'O')}/${new Date(secondCreanceDate).getMonth().toString().padStart(2, '0')}/${new Date(secondCreanceDate).getFullYear()}`;
}

async function calculateAmount() {
  const debtAmountSlot = document.getElementsByClassName("totalDebtsAmount");
  const creancesAmountSlot = document.getElementsByClassName(
    "totalCreancesAmount",
  );
  const activeDebts = document.getElementsByClassName("activeDebts");
  const activeCreances = document.getElementsByClassName("activeCreances");
  // console.log(debtAmountSlot)

  let totalDebtsAmount = 0;
  let totalCreancesAmount = 0;
  const debtData = await axios.get(apiDebtsLink);
  const creancesData = await axios.get(apiCreancesLink);

  creancesData.data.forEach((creance) => {
    totalCreancesAmount += creance.amount;
  });
  debtData.data.forEach((debt) => {
    totalDebtsAmount += debt.amount;
  });
  debtAmountSlot[0].textContent = totalDebtsAmount + " F";
  creancesAmountSlot[0].textContent = totalCreancesAmount + " F";
  activeDebts[0].textContent = debtData.data.length + " dettes actives";
  activeCreances[0].textContent =
    creancesData.data.length + " créances actives";
}
