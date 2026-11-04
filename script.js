// Expense Tracker Class
class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    } 

// add a new expense
addExpense(description, amount, category) {
    const expense = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        category: category,
        date: new Date().toLocaleDateString()
    };

    this.expenses = [...this.expenses, expense];

    this.saveExpenses();
}

// Saving Expenses 
saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
}