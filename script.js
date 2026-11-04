
// creating tracker object   
const tracker = new ExpenseTracker();

// Get HTML Items 
const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const filterCategory = document.getElementById("filter-category");

// Display expenses 
function displayExpenses() {
    expenseList.innerHTML = "";

    const expenses = tracker.filterExpenses(filterCategory.value);

    if (expenses.length === 0) {
        expenseList.innerHTML = "<p class='empty-message'>No expenses recorded yet.</p>";
    }

    expenses.forEach(({ id, description, amount, category, date }) => {
        const div = document.createElement("div");

        div.className = "expense-item";

        const info = document.createElement("div");
        info.className = "expense-info";

        const name = document.createElement("h3");
        name.textContent = description;

        const details = document.createElement("p");
        details.textContent = `${category} | ${date}`;

        info.appendChild(name);
        info.appendChild(details);

        const right = document.createElement("div");
        right.className = "expense-right";

        const price = document.createElement("strong");
        price.textContent = "KSh " + Number(amount).toFixed(2);

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";

        button.addEventListener("click", function() {
            tracker.deleteExpense(id);
            displayExpenses();
        });

        right.appendChild(price);
        right.appendChild(button);

        div.appendChild(info);
        div.appendChild(right);

        expenseList.appendChild(div);
    });

    totalExpenses.textContent = "KSh " + tracker.calculateTotal().toFixed(2);
}

// deleting expense 
function deleteExpense(id) {
    tracker.deleteExpense(id);
    displayExpenses();
}


// Add expense
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (description.trim() === "" || amount <= 0 || category === "") {
        alert("Please enter valid expense details.");
        return;
    }

    tracker.addExpense(description, amount, category);

    form.reset();

    displayExpenses();
});

// filter expenses 
filterCategory.addEventListener("change", function(){
    displayExpenses();
});

displayExpenses(); 
