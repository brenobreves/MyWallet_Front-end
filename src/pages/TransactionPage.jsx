import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext"
import apiTrans from "../services/apiTrans"

export default function TransactionsPage() {
  const navigate = useNavigate()
  const [form , setForm] = useState({valor:undefined, desc:""})
  const {user} = useContext(UserContext)
  const {tipo} = useParams()

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleTrans(e){
    e.preventDefault()
    apiTrans.postTrans(user.token, form, tipo)
    .then(res => {
      console.log(res)
      navigate("/home")
    })

    .catch(err => {
      console.log(err.response.data)
      alert(err.response.data)
    })
    
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleTrans}>
        <input name="valor" value={form.valor} onChange={handleForm} placeholder="Valor" type="text"/>
        <input name="desc" value={form.desc} onChange={handleForm} placeholder="Descrição" type="text" />
        <button type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
