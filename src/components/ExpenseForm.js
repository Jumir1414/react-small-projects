import React from 'react';
import {MdSend} from "react-icons/md";

export const ExpenseForm = ({charge,amount,handleAmount,edit,handleCharge,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                <label className='charge'>charge</label>
                <input 
                type="text"
                className='form-control'
                id='charge'
                name='charge'
                placeholder='e.g rent'
                value={charge}
                onChange={handleCharge}
                />
            </div>
             <div className='form-group'>
                <label className='amount'>amount</label>
                <input 
                type="number"
                className='form-control'
                id='amount'
                name='amount'
                placeholder='e.g 100'
                value={amount}
                onChange={handleAmount}
                />
            </div>
        </div>
        <button type='submit' className='btn'>
            {edit?"Edit":"submit"} <MdSend className='btn- icon'/>
        </button>
    </form>
  )
}
