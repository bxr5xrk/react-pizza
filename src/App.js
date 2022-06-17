import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PizzaList from "./pages/PizzaList";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import "./scss/app.scss";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<PizzaList title="Pizza" />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
