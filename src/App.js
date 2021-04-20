import { useState, useEffect } from 'react';
import request from 'superagent';
import { Loader, Search } from 'react-feather';

import Breed from './components/Breed';

import './App.scss';

function App() {
    const [breedsLoaded, setBreedsLoaded] = useState(false);
    const [breedList, setBreedList] = useState([]);
    const [filteredBreedList, setFilteredBreedList] = useState([]);

    useEffect(() => {
        request.get('https://dog.ceo/api/breeds/list/all').end((err, res) => {
            const breedArray = Object.keys(res.body.message);
            setBreedList(breedArray);
            setFilteredBreedList(breedArray);
            setBreedsLoaded(true);
        });
    }, []);

    const handleFilter = (e) => {
        const filtered = breedList.filter((breed) =>
            breed.includes(e.target.value)
        );
        console.log(filtered);
        setFilteredBreedList(filtered);
    };

    return (
        <div className="App">
            <h1 className="app-title">Dog Breeds</h1>
            <div className="breed-filter">
                <input
                    className="breed-filter-input"
                    onChange={handleFilter}
                    placeholder={'Search'}
                />
                <button className="breed-filter-button">
                    <Search className="search-icon" />
                </button>
            </div>
            <div className="breed-list-container">
                {filteredBreedList.length > 0 ? (
                    <div className="breed-list">
                        {filteredBreedList.map((breedName) => (
                            <Breed breedName={breedName} />
                        ))}
                    </div>
                ) : (
                    <>
                        {!breedsLoaded ? (
                            <div className="loading-container">
                                <Loader className="loader-icon" />
                            </div>
                        ) : (
                            <div className="empty-breeds">
                                <h1 className="empty-breeds">
                                    No breeds match that name :(
                                </h1>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
