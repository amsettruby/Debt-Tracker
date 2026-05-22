const serverUrl = 'https://debt-tracking.onrender.com'
const api = "https://debt-tracking.onrender.com/api/dettes";

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}

window.addEventListener("load", async () => {
  getDebtsData();
});

async function getDebtsData() {
  const data = await axios.get(api);
  // console.log(data.data);
  if (data.data <= 0) {
    const dettesTableBody = document.getElementById("dettesTableBody");
    const loaderRow = document.createElement("tr");
    loaderRow.className = "loader-row";
    const tdColspanSix = document.createElement("td");
    tdColspanSix.colSpan = 6;
    tdColspanSix.textContent = "Chargement des dettes";
    const divSpinner = document.createElement("div");
    divSpinner.className = "spinner";
    tdColspanSix.appendChild(divSpinner);
    loaderRow.appendChild(tdColspanSix);
    dettesTableBody.appendChild(loaderRow);
  } else {
    const dettesTableBody = document.getElementById("dettesTableBody");

    const loaderRow = document.createElement("tr");
    const debtData = data.data;
    const totalDu = document.getElementById("totalDu");
    let allDebts = 0;
    const listDebts = document.getElementById("tableCount");
    listDebts.textContent = debtData.length;
    debtData.forEach((debt) => {
      allDebts += debt.amount;
    });
    totalDu.textContent = allDebts + " F";
    //Ajouter chaque dette sur le tableau
    debtData.forEach((debt) => {
      let debtStatus = "";
      //console.log(debt);
      const tr = document.createElement("tr");
      tr.id = debt._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const debtDescription = document.createElement("td");
      const debtDate = document.createElement("td");
      const debtStatut = document.createElement("td");
      const payTd = document.createElement("td");
      const payButton = document.createElement("button");
      payTd.append(payButton);
      payButton.id = "payedButton";
      payButton.classList.add("pay-buttons");

      debtStatus = debt.state;

      if (debtStatus == true) debtStatut.textContent = "Payé";
      if (debtStatus == false) debtStatut.textContent = "Non Payé";
      if (debtStatus == true) {
        payButton.classList.add("pay-buttons--paid");
        payButton.textContent = "Payé";
      } else {
        payButton.textContent = "Payer";
      }
      userTd.textContent = debt.person;
      amountTd.textContent = debt.amount + " F";
      debtDescription.textContent = debt.description;

      const month = new Date(debt.date).getMonth() + 1;
      debtDate.textContent = `${new Date(debt.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(debt.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(userTd, amountTd, debtDescription, debtDate, debtStatut, payTd);
      // loaderRow.append(tr)
      dettesTableBody.append(tr);
    });
  }
}

//FILTRE EN ATTENTE DE PAIEMENT
const pendingButtonFilter = document.getElementById("pending");
pendingButtonFilter.addEventListener("click", async function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  pendingButtonFilter.className = "filter-btn actives";
  const pendingApiLink = await axios.get(
    serverUrl + "/api/dettes/false",
  );

  const dettesTableBody = document.getElementById("dettesTableBody");

  // console.log(pendingApiLink);

  Array.from(dettesTableBody.children).forEach((child) => child.remove());

  const data = pendingApiLink;
  if (data.data <= 0) {
    const dettesTableBody = document.getElementById("dettesTableBody");

    const loaderRow = document.createElement("tr");
    loaderRow.className = "loader-row";
    const tdColspanSix = document.createElement("td");
    tdColspanSix.colSpan = 6;
    tdColspanSix.textContent = "Chargement des dettes";
    const divSpinner = document.createElement("div");
    divSpinner.className = "spinner";
    tdColspanSix.appendChild(divSpinner);
    loaderRow.appendChild(tdColspanSix);
    dettesTableBody.appendChild(loaderRow);
  } else {
    const dettesTableBody = document.getElementById("dettesTableBody");
    const loaderRow = document.createElement("tr");
    const debtData = data.data;
    const totalDu = document.getElementById("totalDu");
    const listDebts = document.getElementById("tableCount");
    listDebts.textContent = debtData.length;

    //Ajouter chaque dette sur le tableau
    debtData.forEach((debt) => {
      let debtStatus = "";
      const tr = document.createElement("tr");
      tr.id = debt._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const debtDescription = document.createElement("td");
      const debtDate = document.createElement("td");
      const debtStatut = document.createElement("td");
      const payTd = document.createElement("td");
      const payButton = document.createElement("button");
      payTd.append(payButton);
      payButton.id = "payedButton";
      payButton.classList.add("pay-buttons");
      debtStatus = debt.state;

      if (debtStatus == true) debtStatut.textContent = "Payé";
      if (debtStatus == false) debtStatut.textContent = "Non Payé";
      if (debtStatus == true) {
        payButton.classList.add("pay-buttons--paid");
        payButton.textContent = "Payé";
      } else {
        payButton.textContent = "Payer";
      }
      userTd.textContent = debt.person;
      amountTd.textContent = debt.amount + " F";
      debtDescription.textContent = debt.description;

      const month = new Date(debt.date).getMonth() + 1;
      debtDate.textContent = `${new Date(debt.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(debt.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(userTd, amountTd, debtDescription, debtDate, debtStatut, payTd);
      dettesTableBody.append(tr);
    });
  }
});

//FILTRE DEJA PAYER
const payedButtonFilter = document.getElementById("alreadyPaid");
payedButtonFilter.addEventListener("click", async function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  payedButtonFilter.className = "filter-btn actives";
  const paidApiLink = await axios.get(serverUrl + "/api/dettes/true");

  const dettesTableBody = document.getElementById("dettesTableBody");

  // console.log(pendingApiLink);
  //ENVLEVER LES TABLE ROW DEJA EXISTANTS
  Array.from(dettesTableBody.children).forEach((child) => child.remove());

  const data = paidApiLink;
  if (data.data <= 0) {
    const dettesTableBody = document.getElementById("dettesTableBody");

    const loaderRow = document.createElement("tr");
    loaderRow.className = "loader-row";
    const tdColspanSix = document.createElement("td");
    tdColspanSix.colSpan = 6;
    tdColspanSix.textContent = "Chargement des dettes";
    const divSpinner = document.createElement("div");
    divSpinner.className = "spinner";
    tdColspanSix.appendChild(divSpinner);
    loaderRow.appendChild(tdColspanSix);
    dettesTableBody.appendChild(loaderRow);
  } else {
    const dettesTableBody = document.getElementById("dettesTableBody");
    const loaderRow = document.createElement("tr");
    const debtData = data.data;
    const totalDu = document.getElementById("totalDu");
    const listDebts = document.getElementById("tableCount");
    listDebts.textContent = debtData.length;

    //Ajouter chaque dette sur le tableau
    debtData.forEach((debt) => {
      let debtStatus = "";
      const tr = document.createElement("tr");
      tr.id = debt._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const debtDescription = document.createElement("td");
      const debtDate = document.createElement("td");
      const debtStatut = document.createElement("td");
      const payTd = document.createElement("td");
      const payButton = document.createElement("button");
      payTd.append(payButton);
      payButton.classList.add("pay-buttons");
      payButton.id = "payedButton";
      debtStatus = debt.state;

      if (debtStatus == true) debtStatut.textContent = "Payé";
      if (debtStatus == false) debtStatut.textContent = "Non Payé";
      if (debtStatus == true) {
        payButton.classList.add("pay-buttons--paid");
        payButton.textContent = "Payé";
      } else {
        payButton.textContent = "Payer";
      }
      userTd.textContent = debt.person;
      amountTd.textContent = debt.amount + " F";
      debtDescription.textContent = debt.description;

      const month = new Date(debt.date).getMonth() + 1;
      debtDate.textContent = `${new Date(debt.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(debt.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(userTd, amountTd, debtDescription, debtDate, debtStatut, payTd);
      dettesTableBody.append(tr);
    });
  }
});

//AFFICHER TOUTES LES DETTES AVEC LE BOUTTON "TOUTES"
const allDebts = document.getElementById("allDebts");
allDebts.addEventListener("click", function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  allDebts.className = "filter-btn actives";
  Array.from(dettesTableBody.children).forEach((child) => child.remove());
  getDebtsData();
});

//OUVRIR LE FORMULAIRE D'AJOUT DE CREANCES
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modalBackdrop").style.display = "flex";
});

//ANNULER L'AJOUT D'UNE CREANCE
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modalBackdrop").style.display = "none";
});

//ENVOIE DES DONNEES DE DETTES
const submitButton = document.getElementById("submitDebt");
submitButton.addEventListener("click", async () => {
  const name = document.getElementById("fName").value;
  const data = {
    date: Date.now(),
    person: document.getElementById("fName").value,
    amount: document.getElementById("fAmount").value,
    state: false,
    description: document.getElementById("fDesc").value,
  };
  try {
    const newDebt = await axios.post(serverUrl + "/api/dettes", data);
    const debtTableBody = document.getElementById("dettesTableBody");
    const newTr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const amountTd = document.createElement("td");
    const descriptionTd = document.createElement("td");
    const dateTd = document.createElement("td");
    const stateTd = document.createElement("td");
    const payTd = document.createElement("td");
    const payButton = document.createElement("button");
    payButton.textContent = "Payer";
    payButton.classList.add("pay-buttons");
    payTd.appendChild(payButton);
    nameTd.textContent = data.person;
    amountTd.textContent = data.amount;
    descriptionTd.textContent = data.description;
    stateTd.textContent = "Non payé";

    const month = new Date(data.date).getMonth() + 1;
    dateTd.textContent = `${new Date().getDate(data.date).toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date().getFullYear(data.date).toString().padStart(2, "0")}`;

    newTr.append(nameTd, amountTd, descriptionTd, dateTd, stateTd, payTd);
    debtTableBody.appendChild(newTr);
    const totalDu = document.getElementById("totalDu");
    const newDebtAmount = parseInt(totalDu.textContent) + parseInt(data.amount);
    totalDu.textContent = newDebtAmount + " F";

    alert("Dette enregistrée !!");
    document.getElementById("modalBackdrop").style.display = "none";
  } catch (e) {
    alert("Une erreur s'est produite");
  }
});

//MARQUER UNE DETTE COMME DEJA PAYEE
document
  .getElementById("dettesTableBody")
  .addEventListener("click", async function (e) {
    const btn = e.target.closest(".pay-buttons");
    // console.log(btn);
    if (!btn) return;

    const trId = btn.closest("tr").id;
    // console.log("ID de la dette :", trId)

    // Ton appel API ici, ex:
    try {
      await axios.patch(serverUrl + `/api/dettes/${trId}`, {
        _id: trId,
        state: true,
      });
      alert(
        "La dette avec l'id : " +
          trId +
          " a été marquée comme payée avec succès",
      );
      btn.classList.add("pay-buttons--paid");
      btn.textContent = "Payé";
    } catch (e) {
      alert("Une erreur s'est produite");
      console.log(e);
    }
  });
