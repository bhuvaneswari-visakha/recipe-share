import React from 'react'

const Button = (props) => {
  return (
    <button 
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
    >
      {props.name}
    </button>
  )
}

export default Button
