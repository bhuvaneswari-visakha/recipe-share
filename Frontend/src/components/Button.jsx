import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className="rounded-2xl h-10 mx-10 text-white p-2 mt-1" style={{backgroundColor:'#783fa4'}}>{props.name}</button>
    </div>
  )
}

export default Button
