import { useContext,useState } from "react";
import {SubscriptionContext} from "../context/SubscriptionContext";
import { useParams,useHistory } from "react-router-dom";
function SubscriptionStatus() {
    const {updateSubscriptionStatus}=useContext(SubscriptionContext);
    const {id}=useParams();
    const history=useHistory();
    const [status,setStatus]=useState("Active");
    const handleUpdate=()=>{
        updateSubscriptionStatus(id,status);
        history.push(`/subscription/${id}`);
    }
    return(
        <div>
            <h2>Update Subscription Status</h2>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option>Active</option>
                <option>Paused</option>
                <option>Cancelled</option>
            </select>
            <button onClick={handleUpdate}>Update Status</button>
        </div>
    )
}
export default SubscriptionStatus;