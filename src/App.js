import { createContext, useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./components/Header";
import PizzaList from "./pages/PizzaList";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
// import PizzaPage from "./pages/PizzaPage";
import "./scss/app.scss";

export const SearchContext = createContext();

function App() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<PizzaList title="Pizza" />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
