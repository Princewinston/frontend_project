import { createContext,useState } from "react";
export const SubscriptionContext=createContext();
export const SubscriptionProvider=({children})=>{
    const [subscriptions,setSubscription]=useState([]);
    const addSubscription=(subscription)=> {
        setSubscription(prev=>[...prev,subscription])
    }
    const updateSubscriptionStatus=(id,status)=> {
        setSubscription(prev=>prev.map(sub=>sub.id===id?{...sub,status}:sub))
    }
    return (
        <SubscriptionContext.Provider value={{subscriptions,addSubscription,updateSubscriptionStatus}}>{children}</SubscriptionContext.Provider>
    )
}