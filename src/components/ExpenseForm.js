import React from 'react'

import { MdSend } from 'react-icons/md';

export const ExpenseForm = ( {charge, amount, handleCharge, handleAmount, handleSubmit, editItem} ) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-center">
            <div className="form-group">
                <label htmlFor="charge">charge</label>
                <input type="text" className='form-control' id='charge' name='charge' placeholder='e.g. rent' value={charge} onChange={handleCharge}/>
            </div>
            <div className="form-group">
                <label htmlFor="charge">amount</label>
                <input type="number" className='form-control' id='amount' name='amount' placeholder='e.g. 100' value={amount} onChange={handleAmount}/>
            </div>
        </div>
        <button type="submit" className='btn'>
            {editItem ? 'Edit' : 'Submit'}
            <MdSend className='btn-icon'/>
        </button>
    </form>
  )
}
