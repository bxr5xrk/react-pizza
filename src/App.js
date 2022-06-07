import Header from "./components/Header";
import PizzaFilter from "./components/PizzaFilter";
import PizzaList from "./components/PizzaList";
import "./scss/app.scss";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <PizzaFilter />
                    <PizzaList children='Pizza'/>
                </div>
            </div>
        </div>
    );
}

export default App;
