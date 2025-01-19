
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import catStore from "../store/CatsStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
const Navbar = observer(() => {
    const { setActivePage } = catStore;
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
            setActivePage(0);
        } else if (location.pathname === "/favourite") {
            setActivePage(1);
        }
    }, [location.pathname, setActivePage]);
    return (
        <div className={styles.header}>
            <div className={styles.item}>
                <Link to="/" onClick={() => setActivePage(0)}>
                    <div className={`${styles.items} ${catStore.activePage === 0 ? styles.active : ""}`}>
                        Все котики
                    </div>
                </Link>
                <Link to="/favourite" onClick={() => setActivePage(1)}>
                    <div className={`${styles.items} ${catStore.activePage === 1 ? styles.active : ""}`}>
                        Любимые котики
                    </div>
                </Link>
            </div>
        </div>
    );
});
export default Navbar;