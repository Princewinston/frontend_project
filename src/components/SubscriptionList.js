import { useContext } from "react";
import {SubscriptionContext} from "../context/SubscriptionContext";
import { useHistory } from "react-router-dom";
function SubscriptionList() {
    const {subscriptions}=useContext(SubscriptionContext);
    const history=useHistory();
    return (
        <div>
            <h1>Subscription List</h1>
            {subscriptions.length===0 ? (
                <p>No subscriptions yet. Add one!!</p>
            ) :(
            <ul>
                {subscriptions.map(sub=>(
                    <li key={sub.id}><span onClick={()=>history.push(`/subscription/${sub.id}`)}>{sub.name}</span> - Price: ${sub.price} - Status: {sub.status}</li>
                ))}
            </ul>
            )}
        </div>
    )
}
export default SubscriptionList;