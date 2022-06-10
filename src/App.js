import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import PizzaPage from "./pages/PizzaPage";
import "./scss/app.scss";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<PizzaPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
