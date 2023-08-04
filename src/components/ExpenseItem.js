import React from 'react'

import { MdEdit, MdDelete } from 'react-icons/md';

export const ExpenseItem = ( {expense, handleEdit, handleDelete} ) => {
    const {id, charge, amount} = expense;

  return (
    <li className='item' key={id}>
        <div className="info">
            <span className='expense'>{charge}</span>
        </div>
        <div className="amount">
            <span>${amount}</span>
        </div>
        <div>
            <button className='edit-btn' aria-label='edit button'>
                <MdEdit onClick={() => {handleEdit(id)}}/>
            </button>
            <button className='clear-btn' aria-label='delete button'>
                <MdDelete onClick={() => {handleDelete(id)}}/>
            </button>
        </div>
    </li>
  )
}
