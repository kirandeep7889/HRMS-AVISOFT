import React from 'react'
import RenderSteps from '../../../FormComponents/RendersSteps'
import { useSelector } from 'react-redux';


const CreateUpdateEmployee = () => {
  const isEditing = useSelector((state) => state.editing.isEditing);

  return (
    <div className='pb-9 bg-slate-100 rounded  h-[90%] '>
        <div className='p-5 flex items-center justify-between'>
        <div className='text-xl text-slate-600 font-semibold'>
          {
            isEditing ? "Edit Employee" : "Create Employee"
          }
        </div>
        <div>
          <p className='text-slate-950 text-xl left-6 font-semibold'>Home / Dashboard /  
            <span className='text-yellow-700'>
            {
            isEditing ? "Edit Employee" : "Create Employee"
            }
           </span>
          </p>
        </div> 
      </div>
               <RenderSteps/>
        </div>
  )


      }
  
 export default CreateUpdateEmployee;