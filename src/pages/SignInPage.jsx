import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {
  const navigate = useNavigate()
  const [form , setForm] = useState({email:"", senha:""})
  const {user , setUser} = useContext(UserContext)

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleLogin(e){
    e.preventDefault()
    apiAuth.signIn(form)
      .then(res => {
        const {nome , email, saldo, token} = res.data
        setUser({nome , email, saldo , token})
        console.log({nome , email, saldo, token})
        navigate("/home")
      })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data)
      })
  }
  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input name="email" value={form.email} onChange={handleForm} placeholder="E-mail" type="email" required/>
        <input name="senha" value={form.senha} onChange={handleForm} placeholder="Senha" type="password" autoComplete="new-password" required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
