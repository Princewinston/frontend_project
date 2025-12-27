import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscription from "./components/AddSubscription";
import SubscriptionDetails from "./components/SubscriptionDetails";
import SubscriptionStatus from "./components/SubscriptionStatus";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import './App.css'
function App() {
    return(
        <SubscriptionProvider>
            <Router>
                <Navbar/>
                <main>
                <Switch>
                    <Route path="/" exact component={SubscriptionList}/>
                    <Route path="/add-subscription" component={AddSubscription}/>
                    <Route path="/subscription/:id" exact component={SubscriptionDetails}/>
                    <Route path="/subscription-status/:id" component={SubscriptionStatus}/>
                </Switch>
                </main>
            </Router>
        </SubscriptionProvider>
    )
}
export default App;