import { useContext } from "react";
import {SubscriptionContext} from "../context/SubscriptionContext";
import { useParams,useHistory } from "react-router-dom";
function SubscriptionDetails() {
    const {subscriptions}=useContext(SubscriptionContext);
    const {id}=useParams();
    const history=useHistory();
    const subscription=subscriptions.find(sub=>sub.id===id);
    if(!subscription) {
        return <p>Subscription not found!</p>;
    }
    return(
        <div>
            <h2><strong>Subscription Name: </strong>{subscription.name}</h2>
            <p>Price: {subscription.price}</p>
            <p>Status: {subscription.status}</p>
            <button onClick={()=>history.push(`/subscription-status/${id}`)}>Update Subscription Status</button>
            <button onClick={()=>history.push("/")}>Back to Subscription List</button>
        </div>
    )
}
export default SubscriptionDetails