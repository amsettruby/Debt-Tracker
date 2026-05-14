// const { all } = require("axios");

const api = "http://localhost:8080/api/creances";

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}

window.addEventListener("load", async () => {
  getcreancesData();
});

async function getcreancesData() {
  const data = await axios.get(api);
  if (data.data <= 0) {
    const dettesTableBody = document.getElementById("creancesTableBody");
    const loaderRow = document.createElement("tr");
    loaderRow.className = "loader-row";
    const tdColspanSix = document.createElement("td");
    tdColspanSix.colSpan = 6;
    tdColspanSix.textContent = "Chargement des créances…";
    const divSpinner = document.createElement("div");
    divSpinner.className = "spinner";
    tdColspanSix.appendChild(divSpinner);
    loaderRow.appendChild(tdColspanSix);
    dettesTableBody.appendChild(loaderRow);
  } else {
    const creancesTableBody = document.getElementById("creancesTableBody");
    const loaderRow = document.createElement("tr");
    const creanceData = data.data;
    const totalDu = document.getElementById("totalARecevoir");
    let allcreances = 0;
    const listcreances = document.getElementById("tableCount");
    listcreances.textContent = creanceData.length;
    creanceData.forEach((creance) => {
      allcreances += creance.amount;
    });
    totalDu.textContent = allcreances + " F";
    //Ajouter chaque dette sur le tableau
    creanceData.forEach((creance) => {
      let creanceStatus = "";
      const tr = document.createElement("tr");
      tr.id = creance._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const creanceDescription = document.createElement("td");
      const creanceDate = document.createElement("td");
      const creanceStatut = document.createElement("td");

      // const payButton = document.createElement("button");
      const payTd = document.createElement("td");
      const payButton = document.createElement("button");
      payButton.classList.add("pay-buttons");
      payTd.append(payButton);

      creanceStatus = creance.state;

      if (creanceStatus == true) creanceStatut.textContent = "Payé";
      if (creanceStatus == false) creanceStatut.textContent = "Non Payé";
      payButton.textContent = "Payer";
      userTd.textContent = creance.person;
      amountTd.textContent = creance.amount + " F";
      creanceDescription.textContent = creance.description;

      const month = new Date(creance.date).getMonth() + 1;
      creanceDate.textContent = `${new Date(creance.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(creance.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(
        userTd,
        amountTd,
        creanceDescription,
        creanceDate,
        creanceStatut,
        payTd,
      );
      creancesTableBody.append(tr);
    });
  }
}

//FILTRE PAR NON ENCAISSES
const pendingButtonFilter = document.getElementById("pending");
pendingButtonFilter.addEventListener("click", async function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  pendingButtonFilter.className = "filter-btn actives";
  const pendingApiLink = await axios.get(
    "http://localhost:8080/api/creances/false",
  );

  const creancesTableBody = document.getElementById("creancesTableBody");

  // console.log(pendingApiLink);

  Array.from(creancesTableBody.children).forEach((child) => child.remove());

  const data = pendingApiLink;
  if (data.data <= 0) {
    const creancesTableBody = document.getElementById("creancesTableBody");

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
    const creancesTableBody = document.getElementById("creancesTableBody");

    const loaderRow = document.createElement("tr");
    const CreancesData = data.data;
    const totalDu = document.getElementById("totalDu");
    const listCreancess = document.getElementById("tableCount");
    listCreancess.textContent = CreancesData.length;

    //Ajouter chaque dette sur le tableau
    CreancesData.forEach((Creances) => {
      let CreancesStatus = "";
      const tr = document.createElement("tr");
      tr.id = Creances._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const CreancesDescription = document.createElement("td");
      const CreancesDate = document.createElement("td");
      const CreancesStatut = document.createElement("td");
      const payTd = document.createElement("td");
      const payButton = document.createElement("button");
      payButton.classList.add("pay-buttons");
      payTd.append(payButton);
      CreancesStatus = Creances.state;

      if (CreancesStatus == true) CreancesStatut.textContent = "Payé";
      if (CreancesStatus == false) CreancesStatut.textContent = "Non Payé";
      payButton.textContent = "Payer";
      userTd.textContent = Creances.person;
      amountTd.textContent = Creances.amount + " F";
      CreancesDescription.textContent = Creances.description;
      const month = new Date(Creances.date).getMonth() + 1;
      CreancesDate.textContent = `${new Date(Creances.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(Creances.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(
        userTd,
        amountTd,
        CreancesDescription,
        CreancesDate,
        CreancesStatut,
        payTd,
      );
      creancesTableBody.append(tr);
    });
  }
});

//FILTRE DEJA REMBOURSER
const payedButtonFilter = document.getElementById("alreadyPaid");
payedButtonFilter.addEventListener("click", async function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  payedButtonFilter.className = "filter-btn actives";
  const paidApiLink = await axios.get(
    "http://localhost:8080/api/creances/true",
  );

  const creancesTableBody = document.getElementById("creancesTableBody");

  //ENVLEVER LES TABLE ROW DEJA EXISTANTS
  Array.from(creancesTableBody.children).forEach((child) => child.remove());

  const data = paidApiLink;
  if (data.data <= 0) {
    const creancesTableBody = document.getElementById("creancesTableBody");

    const loaderRow = document.createElement("tr");
    loaderRow.className = "loader-row";
    const tdColspanSix = document.createElement("td");
    tdColspanSix.colSpan = 6;
    tdColspanSix.textContent = "Chargement des dettes";
    const divSpinner = document.createElement("div");
    divSpinner.className = "spinner";
    tdColspanSix.appendChild(divSpinner);
    loaderRow.appendChild(tdColspanSix);
    creancesTableBody.appendChild(loaderRow);
  } else {
    const creancesTableBody = document.getElementById("creancesTableBody");

    const loaderRow = document.createElement("tr");
    const CreancesData = data.data;
    const totalDu = document.getElementById("totalDu");
    const listCreancess = document.getElementById("tableCount");
    listCreancess.textContent = CreancesData.length;

    //Ajouter chaque dette sur le tableau
    CreancesData.forEach((Creances) => {
      let CreancesStatus = "";
      const tr = document.createElement("tr");
      tr.id = Creances._id;
      const userTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const CreancesDescription = document.createElement("td");
      const CreancesDate = document.createElement("td");
      const CreancesStatut = document.createElement("td");
      const payTd = document.createElement("td");
      const payButtons = document.createElement("button");
      payTd.append(payButtons);
      payButtons.classList.add("pay-buttons");

      CreancesStatus = Creances.state;

      if (CreancesStatus == true) CreancesStatut.textContent = "Payé";
      if (CreancesStatus == false) CreancesStatut.textContent = "Non Payé";
      payButtons.textContent = "Payer";
      userTd.textContent = Creances.person;
      amountTd.textContent = Creances.amount + " F";
      CreancesDescription.textContent = Creances.description;

      const month = new Date(Creances.date).getMonth() + 1;
      CreancesDate.textContent = `${new Date(Creances.date).getDate().toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${new Date(Creances.date).getFullYear().toString().padStart(2, "0")}`;

      tr.append(
        userTd,
        amountTd,
        CreancesDescription,
        CreancesDate,
        CreancesStatut,
        payTd,
      );
      creancesTableBody.append(tr);
    });
  }
});

//AFFICHER TOUTES LES CREANCES AVEC LE BOUTTON "TOUTES"
const allCreancess = document.getElementById("allCreances");
allCreancess.addEventListener("click", function () {
  const currentActiveButton = document.getElementsByClassName("actives");
  currentActiveButton[0].classList.toggle("actives");
  allCreancess.className = "filter-btn actives";
  Array.from(creancesTableBody.children).forEach((child) => child.remove());
  getcreancesData();
});

//OUVRIR LE FORMULAIRE D'AJOUT DE CREANCES
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modalBackdrop").style.display = "flex";
});

//ANNULER L'AJOUT D'UNE CREANCE
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modalBackdrop").style.display = "none";
});

//ENVOIE DES DONNEES DE CREANCES
const submitButton = document.getElementById("submitCreance");
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
    const newDebt = await axios.post(
      "http://localhost:8080/api/creances",
      data,
    );
    const creanceTableBody = document.getElementById("creancesTableBody");
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

    const totalARecevoir = document.getElementById("totalARecevoir");
    const newCreanceAmount =
      parseInt(totalARecevoir.textContent) + parseInt(data.amount);
    totalARecevoir.textContent = newCreanceAmount + " F";

    newTr.append(nameTd, amountTd, descriptionTd, dateTd, stateTd, payTd);
    creanceTableBody.appendChild(newTr);
    document.getElementById("modalBackdrop").style.display = "none";
    alert("Créance enregistrée !!");
  } catch (e) {
    console.log(e);
    alert("Une erreur s'est produite");
  }
});

//MARQUER UNE CREANCE COMME DEJA PAYEE
document
  .getElementById("creancesTableBody")
  .addEventListener("click", async function (e) {
    const btn = e.target.closest(".pay-buttons");
    // console.log(btn);
    if (!btn) return;

    const trId = btn.closest("tr").id;
    // console.log("ID de la dette :", trId);

    // Ton appel API ici, ex:
    try {
      await axios.patch(`http://localhost:8080/api/creances/${trId}`, {
        _id: trId,
        state: true,
      });
      alert(
        "La creance avec l'id : " +
          trId +
          " a été marquée comme payée avec succès",
      );
      btn.disabled = true; // Désactive le bouton (gère nativement le clic)
      btn.style.backgroundColor = "grey";
      btn.style.cursor = "not-allowed"; // Affiche l'icône "interdit"
      btn.textContent = "Payé"; // Op
    } catch (e) {
      alert("Une erreur s'est produite");
      console.log(e);
    }
  });
