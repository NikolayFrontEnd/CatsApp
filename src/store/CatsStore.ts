import { makeObservable, observable, action } from "mobx";
import axios from 'axios';
interface Arraycat {
    id: string; 
    url: string;
}
class CatStore {
    cat: Arraycat[] = []; 
    isLoad: boolean = false; 
    error: string | null = null; 
    page: number = 1;
    limit: number = 26;
    favoriteCats: Arraycat[] = [];
    activePage: number = 0;
    constructor() {
        makeObservable(this, {
            cat: observable,
            isLoad: observable,
            error: observable,
            page: observable,
            fetch: action,
            increasePage: action,
            favoriteCats: observable,
            addToFavorites: action,
            deleteFavorites: action,
            activePage: observable,
            setActivePage: action,
        });
    }
    increasePage() {
        this.page++;
        this.fetch();
    }
    fetch = async () => {
        this.isLoad = true;
        this.error = null;
    
        try {
            const response = await axios.get<Arraycat[]>(
                `https://api.thecatapi.com/v1/images/search?limit=${this.limit}&page=${this.page}`,
                {
                    headers: {
                        'x-api-key': 'live_vEihYziJHH70XvJSPlx5F4K3LdGFmi3mDHI9xXOHzDRSld5kUceW5CbxXuqxRHHY',
                    },
                }
            );
            this.cat = [...this.cat, ...response.data];
        } catch (err) {
            this.error = "Не удалось загрузить данные.";
        } finally {
            this.isLoad = false;
        }
    };
    addToFavorites = (favoriteCat: Arraycat) => {
        const isAlreadyFavorite = this.favoriteCats.some(cat => cat.id === favoriteCat.id);
        if (!isAlreadyFavorite) {
            this.favoriteCats.push(favoriteCat); 
        }
    };
    deleteFavorites = (favoriteCat: Arraycat) => {
        this.favoriteCats = this.favoriteCats.filter(cat => cat.id !== favoriteCat.id);
    };

    setActivePage = (page: number) => {
        this.activePage = page; 
    };
}
const catStore = new CatStore();
export default catStore;
