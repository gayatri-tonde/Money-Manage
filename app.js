let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Dashboard elements
const incAmt = document.querySelector(".inc-amt");
const expAmt = document.querySelector(".exp-amt");
const balAmt = document.querySelector(".bal-amt");

// Table body
const tbody = document.querySelector("tbody");

// Form elements
const form = document.getElementById("transactionForm");
const desc = document.getElementById("desc");
const date = document.getElementById("date");
const type = document.getElementById("type");
const amount = document.getElementById("amount");

// Add transaction
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const transaction = {
    description: desc.value,
    date: date.value,
    type: type.value,
    amount: Number(amount.value),
  };

  transactions.push(transaction);
  saveToLocalStorage();

  updateDashboard();
  renderTable();
  summary();
  form.reset();

  bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
});

// Update dashboard
function updateDashboard() {
  let income = 0,
    expense = 0;

  transactions.forEach((t) => {
    t.type === "income" ? (income += t.amount) : (expense += t.amount);
  });

  incAmt.textContent = income.toFixed(2);
  expAmt.textContent = expense.toFixed(2);
  balAmt.textContent = (income - expense).toFixed(2);
}

// Render table
function renderTable() {
  tbody.innerHTML = "";

  transactions.forEach((t, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${t.description}</td>
      <td>${t.date}</td>
      <td>${t.type}</td>
      <td>${t.amount}
      <button class="btn btn-sm del" onclick="deleteTransaction(${i})"> <i class="bi bi-trash3-fill"  ></i></button></td>
    `;

    tbody.appendChild(row);
  });
}

// delete transaction
function deleteTransaction(i) {
  transactions.splice(i, 1);
  saveToLocalStorage();
  renderTable();
  updateDashboard();
  summary();
}

//local storage
function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//reminder
let RemBtn = document.querySelector(".RemBtn");
let RemInp = document.querySelector(".RemInp");
let RemUl = document.querySelector(".RemUl");
RemBtn.addEventListener("click", function () {
  if (RemInp.value.trim() === "") return;

  let li = document.createElement("li");
  li.textContent = RemInp.value;
  RemUl.append(li);

  RemInp.value = ""; // clear input
});

//sum-text
let sumText = document.querySelector(".sum-text");
function summary() {
  const incomes = transactions
    .filter((t) => t.type === "income")
    .map((t) => t.amount);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .map((t) => t.amount);

  const lowestIncome = incomes.length ? Math.min(...incomes) : 0;
  const lowestExpense = expenses.length ? Math.min(...expenses) : 0;
  const HighestIncome = incomes.length ? Math.max(...incomes) : 0;
  const HighestExpense = expenses.length ? Math.max(...expenses) : 0;

  sumText.innerHTML = `
  <h6>Highest Income Transaction: ${HighestIncome}</h6>
  <h6>Highest Expense Transaction: ${HighestExpense}</h6>
  <h6>Lowest Income Transaction: ${lowestIncome}</h6>
  <h6>Lowest Expense Transaction: ${lowestExpense}</h6>
  `;
}

summary();
renderTable();
updateDashboard();
