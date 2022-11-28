import './App.css';
import Alert from './components/Alert';
import { ExpenseForm } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from 'react';
// const initialExpense =[
//   {id:uuidv4(), charge:"rent",amount:1600},
//   {id:uuidv4(), charge:"car payement",amount:400},
//   {id:uuidv4(), charge:"rent",amount:1000},

// ];
const initialExpense = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem("expenses")): [];
console.log(initialExpense);

function App() {
  const [expenses,setExpenses]= useState(initialExpense);
  const [charge,setCharge]=useState('');
  const [amount,setAmount]= useState('');
  const [alert,setAlert]= useState({show:false});
  const [edit,setEdit]= useState(false);
  const [id,setId]=useState('0');
  const handleCharge =e =>{
    setCharge(e.target.value);
  };
  const handleAmount =e =>{
    setAmount(e.target.value);
  };
  const handleAlert =({type,text})=>{ 
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false});
    },4000);

  }

  const handleSubmit=e=>{
    e.preventDefault();
    if(charge !== '' && amount>>0){
      if(edit){
        let tempExpense = expenses.map(item =>{
          return item.id === id?{...item,charge:charge,amount:amount} :item;
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({type:"success",text:"item edited"});

      }else{
        const newExpense= {id:uuidv4(),charge:charge,amount:amount};
        setExpenses([...expenses,newExpense]);
         handleAlert({type:"success",text:"item added"});
      }
      
        setCharge('');
        setAmount('');
       
    }else{
      handleAlert({type:"danger", text:"charge should not be empty or amount must be greater than 0"})
    }
  }
  const clearItem=()=>{
    setExpenses([]);
    handleAlert({type:"danger", text:"all item cleared"});
  }
  const handleDelete=id=>{
    let tempExpenses = expenses.filter(item=>item.id!==id);
    setExpenses(tempExpenses);
    handleAlert({type:"danger", text:"item deleted"});
  }
  const handleEdit=id=>{
    let expense = expenses.find(item=>item.id===id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  }
  useEffect(()=>{
      console.log("we called useEffect");
      localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses])
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className='App'>
      <ExpenseForm charge = {charge} amount={amount} 
      handleAmount={handleAmount}
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      edit={edit}
      />
      <ExpenseList expenses={expenses} clearItem={clearItem} 
      handleDelete={handleDelete}
      handleEdit={handleEdit}/>
    </main>
    <h1>
      Total spending : <span className='total'>
        ${expenses.reduce((acc,curr)=>{
          return (acc+=parseInt(curr.amount));
        },0)}
      </span>
    </h1>
    </>
  );
}
export default App;