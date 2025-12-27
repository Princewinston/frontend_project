import {useState,useContext} from "react";
import {SubscriptionContext} from '../context/SubscriptionContext';
import {useHistory} from "react-router-dom";

function AddSubscription() {
    const {addSubscription}=useContext(SubscriptionContext);
    const history=useHistory();

    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [status,setStatus]=useState("Active");

    const handleSubmit=(e)=>{
        e.preventDefault();
        addSubscription({
            id: Date.now().toString(),
            name,
            price: Number(price),
            status
        });
        history.push("/");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Subscription</h2>
            <input placeholder="Subscription Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input placeholder="Price (in $)" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option>Active</option>
                <option>Paused</option>
                <option>Cancelled</option>
            </select>
            <button type="submit">Add Subscription</button>
        </form>
    )
}
export default AddSubscription;