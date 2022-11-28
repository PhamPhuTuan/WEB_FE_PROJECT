import "./poster.scss"
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import RemoveIcon from '@mui/icons-material/Remove';

const Poster = result => {
    const { item, item: { title, original_name, original_title, name, genre_ids, backdrop_path }, isFavourite } = result;
    let fallbackTitle = title || original_title || name || original_name;
    const genresConverted = useGenreConversion(genre_ids);
    const dispatch = useDispatch();

    const handleAdd = event => {
        event.stopPropagation();
        dispatch(addToFavourites({ ...item, isFavourite }));
    };
    const handleRemove = event => {
        event.stopPropagation();
        dispatch(removeFromFavourites({ ...item, isFavourite }));
    };

    const handleModalOpening = () => {
        dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
    }

    const handlePlayAction = event => {
        event.stopPropagation();
    };

    return (
        <motion.div
            variants={posterFadeInVariants}
            className='Poster'
            onClick={handleModalOpening}
        >
            {backdrop_path ? (
                <img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
            ) : (
                <>
                    <img src='' alt={fallbackTitle} />
                    <div className='Poster__fallback'>
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Poster__info">
                <div style={{width: '100px', display: 'flex', justifyContent: 'space-around'}} className="Poster__info--iconswrp">
                    <Link
                        className="Poster__info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
                    >
                        <FaPlay />
                    </Link>
                    {!isFavourite
                        ? (
                            <IconButton style={{backgroundColor: '#fad4c4',borderRadius: '50%', width: '25px', height: '25px'}} onClick={handleAdd}>
								<AddIcon/>
							</IconButton>
                        ): (
                            <IconButton style={{backgroundColor: '#fad4c4',borderRadius: '50%', width: '25px', height: '25px'}} onClick={handleRemove}>
								<RemoveIcon/>
							</IconButton>
                        )}
                    <IconButton style={{backgroundColor: '#fad4c4',borderRadius: '50%', width: '25px', height: '25px'}} onClick={handleModalOpening}>
                        <InfoIcon/>
                    </IconButton>
                </div>
                <div className="Poster__info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="Poster__info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Poster