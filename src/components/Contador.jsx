/* Hooks -> Manipula o estado da variável. Exemplo: useState (muda o estado da variavel) */

// Função que chama outra função = callback //

import {useState} from "react"

const Contador = () => {
// Para chamar o Hook: //
const [contador, setContador]=useState(0);

  return (
    <>
      <h1>Contagem Inicial:{contador}</h1>
      <button onClick={()=>setContador(contador +1)}>Aumentar</button>
    </>
  )
}

export default Contador
