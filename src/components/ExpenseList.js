import React from 'react'

import { ExpenseItem } from './ExpenseItem';
import {MdDelete} from 'react-icons/md'

export const ExpenseList = ({expenses, handleEdit, handleDelete, clearItems}) => {
  return (
    <>
        <ul className="list">
            {expenses.map((exp) => (
              <ExpenseItem 
              expense={exp} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete} /> 
            ))}
        </ul>
        {expenses.length > 0 && <button className='btn'onClick={clearItems}> Clear Expenses
            <MdDelete className='btn-icon' />
        </button>
        }
    </>
  )
}
