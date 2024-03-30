import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './RemoveDuplicatesPage.scss'
import { getNotRedundantValues } from "../../utils/removeDuplicates"

export default function RemoveDuplicatesPage() {
  const [redundantValues, setRedundantValues] = useState("")
  const [filteredValues, setFilteredValues] = useState([])
  const [sendButtonMessage, setSendButtonMessage] = useState("Enviar")
  const [copyButtonMessage, setCopyButtonMessage] = useState("Copiar")

  function writeRedundantValues(value) {
    setRedundantValues(value)
    setSendButtonMessage("Enviar")
  }

  function sendRedundantValues() {
    if (redundantValues === "") return
    const values = getNotRedundantValues(redundantValues)
    setFilteredValues(values)
    setSendButtonMessage("Enviados!")
    setCopyButtonMessage("Copiar")
  }

  function copyFilteredValues() {
    let copiedText = ""

    filteredValues.forEach(value => {
      copiedText += `${value}\n`
    })

    navigator.clipboard.writeText(copiedText)

    setCopyButtonMessage("Copiados!")
  }

  return (
    <main className="remove-duplicates-page">
      <h2>Remover Duplicatas</h2>
      <div className="values-container">
        <div className="redundant-values-container">
          <h3>Valores Redundantes</h3>
          <textarea
            name="redundant-values"
            placeholder='Insira aqui os IDs Escaneáveis armazenados no Rodeo...'
            value={redundantValues}
            onChange={(e) => writeRedundantValues(e.target.value)}
          />
          <button onClick={sendRedundantValues}>{sendButtonMessage}</button>
        </div>
        {
          filteredValues.length > 0 && (
            <>
              <ArrowForwardIcon className='arrow' />
              <div className="filtered-values-container">
                <h3>Valores Filtrados</h3>
                <div className="values">
                  {
                    filteredValues.map((value, index) => (
                      <div className="value" key={index}>
                        {value}
                      </div>
                    ))
                  }
                </div>
                <button onClick={copyFilteredValues}>{copyButtonMessage}</button>
              </div>
            </>
          )
        }
      </div>
    </main>
  )
}
