import React from "react";
import st from "./PizzaSearch.module.scss";

const PizzaSearch = ({ searchValue, setSearchValue }) => {
    return (
        <div className={st.container}>
            <svg
                className={st.icon}
                height="22"
                viewBox="0 0 48 48"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
                <path d="M0 0h48v48h-48z" fill="none" />
            </svg>
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={st.search}
                placeholder="Знайти піцу..."
            />
            {searchValue && (
                <svg
                    onClick={() => setSearchValue("")}
                    className={st.closeIcon}
                    height="22"
                    viewBox="0 0 200 200"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
            )}
        </div>
    );
};

export default PizzaSearch;
