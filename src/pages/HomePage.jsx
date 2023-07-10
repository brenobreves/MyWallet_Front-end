import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import apiTrans from "../services/apiTrans"

export default function HomePage() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const [trans, setTrans] = useState([])

  useEffect(getTransList,[])

  function getTransList(){
    console.log(user)
    apiTrans.getTrans(user.token)
    .then(res =>{
      setTrans(res.data)
      console.log(res.data)
    })
    .catch(err => {     
      console.log(err)
      if(err.response.status === 401) navigate("/")
    })
  }

  function Logout(){
    localStorage.setItem("user", JSON.stringify({}))
    navigate("/")
    console.log(user)
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.nome}</h1>
        <BiExit onClick={Logout}/>
      </Header>
      <TransactionsContainer>
        {trans.length === 0 ? <SCTransVazio>Não há registros de<br></br> entrada ou saída</SCTransVazio>   :""}
        <ul>
          {trans.map(trans => (
            <ListItemContainer key={trans._id}>
              <div>
                <span>{trans.data}</span>
                <strong>{trans.desc}</strong>
              </div>
              <Value color={trans.tipo === "entrada"? "positivo": "negativo"}>{`${trans.valor}`.replace(".", ",")}</Value>
            </ListItemContainer>
          ))}
        </ul>
        {trans.length === 0 ? "" :<article><strong>Saldo</strong><Value color={user.saldo < 0 ? "negativo" : "positivo"}>{user.saldo ? `${user.saldo.toFixed(2)}`.replace(".", ",") : ""}</Value></article>
}    
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={()=> navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button >
        <button onClick={()=> navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const SCTransVazio = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
  align-items: center;
  text-align:center;
  color:#868686;
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`