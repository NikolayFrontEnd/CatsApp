
import styles from "./AllCats.module.css"
import catStore from "../store/CatsStore";
import { observer } from "mobx-react";
import icon from "../assets/Vector.png";
const Lovely = observer(() => {
    const { favoriteCats, deleteFavorites } = catStore;
    if (favoriteCats.length === 0) {
        return <p>Нет любимых котиков!</p>;
    }
    return (
        <div>
            <div className={styles.catsgallery}>
                {favoriteCats.map((catItem) => (
                    <div key={catItem.id} className={styles.catcard}>
                        <img
                            src={catItem.url}
                            alt="Cat"
                            className={styles.catimage}
                        />
                        <img
                            src={icon} 
                            alt="удалит из любимых"
                            className={styles.heartIcon}
                            onClick={() => deleteFavorites(catItem)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
export default Lovely;
