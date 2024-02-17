// customized botton for orange buttons

function Btn1({text, style}) {
  return (
    <button 
        className={`${style} btn1`}>
        {text}
    </button>
  )
}

export default Btn1