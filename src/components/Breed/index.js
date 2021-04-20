import { useEffect, useState } from 'react';
import request from 'superagent';
import { Loader } from 'react-feather';

import './styles.scss';

function DogBreed({ breedName }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setImageUrl('');
        request
            .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
            .end((err, res) => {
                setImageUrl(res.body.message);
            });
    }, [breedName]);

    return (
        <div className="dog-breed">
            {imageUrl ? (
                <img src={imageUrl} alt={breedName} className="breed-image" />
            ) : (
                <div className="breed-image-placeholder">
                    <Loader className="loader-icon" />
                </div>
            )}
            <div className="breed-name-container">
                <div className="breed-name">{breedName}</div>
            </div>
        </div>
    );
}

export default DogBreed;
