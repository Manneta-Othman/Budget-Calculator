import './App.css';

import { useState, useEffect } from 'react';

import { Alert } from './components/Alert';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';


// initial values
/* const initialExpenses = [
  {id: uuidv4(), charge:'rent', amount: 1600},
  {id: uuidv4(), charge:'car payment', amount: 600},
  {id: uuidv4(), charge:'credit card bill', amount: 100}
];  */

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [] ;

function App() {

  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // ******** State Values
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show:false});

  const [editItem, setEditItem] = useState(false);
  const [id, setId] = useState(0);

  /********* UseEffect Hook *********/
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  },[expenses]);

  // ******** Functionality

  const handleCharge = e => {
    setCharge(e.target.value);
  }
  //*************//

  const handleAmount = e => {    
    setAmount(e.target.value);
  }

  //*************//

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});

    setTimeout(() => {
      setAlert({show:true});
    }, 3000);
  }

  //*************//
  const handleSubmit = e => {
    e.preventDefault();

    if(charge !== '' && amount > 0 && !editItem){
      const singleExpense = {id: uuidv4(), charge: charge, amount: amount};

      setExpenses([...expenses, singleExpense ]);
      handleAlert({type: 'success', text: 'Item Added'});
      setCharge('');
      setAmount('');

    }else if(editItem){
      let editedItem = expenses.map(item => item.id === id ? {...item, charge, amount} : item);
      
      setExpenses([...editedItem]);

      setCharge('');
      setAmount('');
      setEditItem(false);
      handleAlert({type: 'success', text: `Item Edited Successfully`});

    }else{

      handleAlert({type: 'danger', text: `Charge can't be empty value and amount has to be bigger than Zero`});
    }

  }
  /*********** Handle clear items *************/

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type:'danger', text: 'All Item Deleted'});
    setCharge('');
    setAmount('');
  }

  /*********** Handle Edit and Delete *************/
  const handleEdit = id => {

    let editedItem = expenses.find(item => item.id === id);
    
    setCharge(editedItem.charge)
    setAmount(editedItem.amount);
    setEditItem(true);
    setId(id);

    
/*     handleAlert({type:'success', text: 'Item Edited successfully'})
 */
  }

  const handleDelete = id => {
    console.log(`item deleted ${id}`)

    let tempexpenses = expenses.filter(item => item.id !== id);
    setExpenses([...tempexpenses]);
    handleAlert({type:'danger', text: 'Item deleted'})
  }

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
    <h1>Budget Calculator</h1>
    <main className='App'>
    <ExpenseForm 
    charge={charge} amount={amount} 
    handleCharge={handleCharge} handleAmount={handleAmount} 
    handleSubmit={handleSubmit} 
    editItem={editItem}
    />
    <ExpenseList 
    expenses = {expenses} 
    handleEdit = {handleEdit} 
    handleDelete = {handleDelete}
    clearItems = {clearItems}
    /> 
    </main>
    <h1>
      Total Spending : <span className='total'>
        $ {expenses.reduce((acc, curr) => {
          return (acc += Number(curr.amount)) ;
        },0)}
      </span>
    </h1>
    </>
  );
}

export default App;
