import { useEffect, useState } from 'react';
import request from 'superagent';
import { Loader } from 'react-feather';

import './styles.scss';

// Have each breed fetch it's image since the api doesn't return images on original call
// This does mean when filtering causes rerender the images may change
function DogBreed({ breedName }) {
    const [imageUrl, setImageUrl] = useState('');

    // Fetch random image for breed
    useEffect(() => {
        // reset image if breedName has changed
        setImageUrl('');

        // fetch image
        request
            .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
            .end((err, res) => {
                if (!err) {
                    setImageUrl(res.body.message);
                } else {
                    console.error(
                        `Error fetching image for breed: ${breedName}`
                    );
                    console.error(err);
                }
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
