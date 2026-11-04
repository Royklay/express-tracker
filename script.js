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

// Deleting an expense 
deleteExpanse(...ids){
    this.expenses = this.expenses.filter(
        expense => !ids.includes(expense.id)
    );

    this.saveExpenses();
}

// filter expenses 
filterExpenses(category) {
    return this.expenses.filter(
        expense => category === "All" || expense.category === category
    );
}

// calculating expenses 
calculateTotal() {
    const today = new Date().toLocaleDateString();

    return this.expenses
        .filter(expense => expense.date === today)
        .reduce((total, expense) => total + expense.amount, 0);
}
