let transactions = [];

// Dashboard elements
const incAmt = document.querySelector(".inc-amt");
const expAmt = document.querySelector(".exp-amt");
const balAmt = document.querySelector(".bal-amt");

// Table body
const tbody = document.querySelector("tbody");

// Form elements
const form = document.getElementById("transactionForm");
const desc = document.getElementById("desc");
const category = document.getElementById("category");
const date = document.getElementById("date");
const type = document.getElementById("type");
const amount = document.getElementById("amount");

// Add transaction
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const transaction = {
    description: desc.value,
    category: category.value,
    date: date.value,
    type: type.value,
    amount: Number(amount.value),
  };

  transactions.push(transaction);

  updateDashboard();
  renderTable();
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
      <td>${t.category}</td>
      <td>${t.date}</td>
      <td>${t.type}</td>
      <td>${t.amount}
      <button class="btn btn-sm"> <i class="bi bi-trash3-fill"></i></button></td>
    `;

    tbody.appendChild(row);
  });
}
