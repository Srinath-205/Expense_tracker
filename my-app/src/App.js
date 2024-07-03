import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addExpense = (expense) => {
    axios.post('http://localhost:3001/expenses', expense)
      .then(response => setExpenses([...expenses, response.data]))
      .catch(error => console.error('Error adding expense:', error));
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3001/expenses/${id}`)
      .then(() => setExpenses(expenses.filter(expense => expense.id !== id)))
      .catch(error => console.error('Error deleting expense:', error));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <AddExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default App;
