import { useState, useEffect, useRef } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './CheckPrioritiesPage.scss'
import { getNotRedundantValues } from "../../utils/removeDuplicates"

export default function CheckPrioritiesPage() {
  const [savedValues, setSavedValues] = useState([])
  const [checkedValue, setCheckedValue] = useState("")
  const [isPriority, setIsPriority] = useState(false)
  const [storedValues, setStoredValues] = useState("")
  const [filteredValues, setFilteredValues] = useState([])
  const [sendButtonMessage, setSendButtonMessage] = useState("Enviar")

  const getterPriorityInputRef = useRef()

  function writeStoredValues(value) {
    setStoredValues(value)
    setSendButtonMessage("Enviar")
    setSavedValues([])
  }

  function writeCheckedValues(value) {
    setCheckedValue(value)

    if (checkedValue.includes("tsX")) {
      if (checkedValue.length === 10) getterPriorityInputRef.current.select()
    }
    if (checkedValue.includes("tscage" | "tscart")) {
      if (checkedValue.length === 8) getterPriorityInputRef.current.select()
    }
  }

  function addMoreValues() {
    let previousSavedValues = ""

    savedValues.forEach(value => {
      previousSavedValues += `${value}\n`
    })

    setSavedValues([])
    setStoredValues(previousSavedValues)
    localStorage.removeItem("totes")
    setSendButtonMessage("Enviar")
  }

  function sendStoredValues() {
    if (storedValues === "") return

    const previousSavedValues = JSON.parse(localStorage.getItem("totes"))

    if (!previousSavedValues === null) localStorage.removeItem("totes")
    const values = getNotRedundantValues(storedValues)

    setFilteredValues(values)
    localStorage.setItem("totes", JSON.stringify(values))

    setSendButtonMessage("Enviados!")
  }

  function getSavedValues() {
    const values = JSON.parse(localStorage.getItem("totes"))
    if (values) setSavedValues(values)
  }

  function checkIfIsPriority() {
    if (savedValues.includes(checkedValue)) setIsPriority(true)
    else setIsPriority(false)
  }

  useEffect(() => {
    getSavedValues()
  }, [filteredValues])

  useEffect(() => {
    checkIfIsPriority()
  }, [checkedValue])

  return (
    <main className="check-priorities-page">
      <h2>Verificar Prioridades</h2>
      <div className="values-container">
        <div className="stored-values-container">
          <h3>Valores Armazenados</h3>
          {
            !savedValues.length > 0
              ? (
                <textarea
                  name="stored-values"
                  placeholder='Insira aqui os IDs Escaneáveis armazenados no Rodeo...'
                  value={storedValues}
                  onChange={(e) => writeStoredValues(e.target.value)}
                />
              )
              : (
                <div className="values">
                  {
                    savedValues.map((value, index) => (
                      <div className="value" key={index}>{value}</div>
                    ))
                  }
                </div>
              )
          }
          {
            !savedValues.length > 0
              ? <button onClick={sendStoredValues}>{sendButtonMessage}</button>
              : <button onClick={addMoreValues}>Adicionar Mais</button>
          }
        </div>
        {
          (savedValues.length > 0) && (
            <>
              <ArrowForwardIcon className='arrow' />
              <div className="checker-container">
                <h3>Verificador de Prioridades</h3>
                <input
                  type="text"
                  name='priotity-getter'
                  onChange={(e) => writeCheckedValues(e.target.value)}
                  ref={getterPriorityInputRef}
                />
                <div className={
                  `priority-result 
                  ${checkedValue.length === 0 ? "not-checked" : ""}
                  ${
                    (checkedValue.length > 0 && isPriority)
                    ? "priority"
                    : ""
                  }
                  ${
                    (checkedValue.length > 0 && !isPriority)
                    ? "not-priority"
                    : ""
                  }
                  `
                }>
                  <div className="tote-image">
                    <img src="/images/yellow-tote.png" alt="" />
                  </div>
                  <p className="message">
                    {
                      (checkedValue.length === 0 && checkedValue === "") 
                      && "Escaneie o tote desejado para verificar se ele é, de fato, uma prioridade."
                    }
                    {
                      (checkedValue.length > 0 && checkedValue !== "" && isPriority)
                      && "Este tote é uma prioridade! Destaque-o ou leve-o para uma das estações."
                    }
                    {
                      (checkedValue.length > 0 && checkedValue !== "" && !isPriority)
                      && "Este tote não é uma prioridade (ainda). Caso haja outro tote por perto, verifique-o."
                    }
                  </p>
                </div>
              </div>
            </>
          )
        }
      </div>
    </main>
  )
}
