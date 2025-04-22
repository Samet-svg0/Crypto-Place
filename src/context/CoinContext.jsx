import React, { createContext, useEffect, useState } from 'react'
import api from '../utils/api';

const CoinContext= createContext();
const CoinContextProvider = ({children}) => {

   const [allCoin, setAllCoin] = useState([]);
   const [currency, setCurrency] = useState({
    name:"usd",
    symbol:"$",
   })


const fetchAllCoin = ()=> {
    api.get("/coins/markets", { params:{vs_currency: currency.name}})
    .then((res)=> setAllCoin(res.data))
    .catch((err)=>{
        alert("Coin verilerini alirken bir hata olustu:",err)
    })
};
useEffect(()=> {
    fetchAllCoin();
},[currency])


const contextValue={currency, allCoin, setCurrency}

   
  return (
 <CoinContext.Provider value={contextValue}>
    {children}</CoinContext.Provider>
  )
}

export  {CoinContextProvider,CoinContext}
