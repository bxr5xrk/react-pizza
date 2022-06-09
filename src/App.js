import Header from "./components/Header";
import PizzaPage from "./pages/PizzaPage";
import "./scss/app.scss";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <PizzaPage />
                </div>
            </div>
        </div>
    );
}

export default App;
