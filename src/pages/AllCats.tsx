import { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import catStore from "../store/CatsStore";
import styles from "./AllCats.module.css"
import icon from "../assets/Vector.png";
import iconUnclick from '../assets/Vector0.png';

const AllCats = observer(() => {
    const {
        cat, fetch, isLoad,error, increasePage, addToFavorites,deleteFavorites,favoriteCats,
    } = catStore;

    useEffect(() => {
        if (cat.length === 0) {
            fetch();
        }
    }, [fetch, cat.length]);

    const handleWhenEnd = useCallback(() => {
        if (!isLoad) {
            increasePage();
            console.log("Мы уже в конце страницы!");
        }
    }, [isLoad, increasePage]);

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        if (fullHeight - (windowHeight + scrollTop) < 150) {
            handleWhenEnd();
        }
    }, [handleWhenEnd]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    if (isLoad) return <p className = {styles.load}>Загрузка котиков...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className={styles.catsgallery}>
                {cat.map(catItem => {
                    const isFavorite = favoriteCats.some(favor => favor.id === catItem.id);

                    return (
                        <div key={catItem.id} className={styles.catcard}>
                            
                            <img
                                src={catItem.url}
                                alt="кот"
                                className={styles.catimage}
                            />

                            <img
                                src={isFavorite ? icon : iconUnclick} 
                                alt="любимый"
                                className={styles.heartIcon}
                                onClick={() =>
                                    isFavorite? deleteFavorites(catItem) : addToFavorites(catItem) 
                                }
                            />

                        </div>
                    );
                })}
            </div>
        </div>
    );
});
export default AllCats;
