import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({nome:"" , email:"" , senha:"", confirm:""})

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleRegister(e){
    e.preventDefault()
    if(form.senha !== form.confirm){
      alert("A senha confirmada é diferente da informada")
      return
    }
    const body = form
    delete body.confirm
    apiAuth.signUp(body)
      .then(res => {
        console.log(res.data)
        navigate("/") 
      })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data)
      })
  }
  return (
    <SingUpContainer>
      <form onSubmit={handleRegister}>
        <MyWalletLogo />
        <input data-test="name" name="nome" value={form.nome} onChange={handleForm} placeholder="Nome" type="text" required/>
        <input data-test="email" name="email" value={form.email} onChange={handleForm} placeholder="E-mail" type="email" required/>
        <input data-test="password" name="senha" value={form.senha} onChange={handleForm} placeholder="Senha" type="password" autoComplete="new-password" required/>
        <input data-test="conf-password" name="confirm" value={form.confirm} onChange={handleForm} placeholder="Confirme a senha" type="password" autoComplete="new-password" required/>
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
