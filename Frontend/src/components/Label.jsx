import React from 'react'

const Label = (props) => {
  return (
    <div>
      <label for="name" className='font-small italic text-white  text-1xl'>{props.name}</label>
    </div>
  )
}

export default Label
