import React from "react";
import { Route, NavLink, useHistory } from "react-router-dom";
import axios from "axios";

const MovieCard = (props) => {
    const { title, director, metascore, stars } = props.movie;

    const { push } = useHistory();
    // same as:
    // const history = useHistory();
    // const push = history.push;
    const item = props.movies.find(
        (thing) => `${thing.id}` === props.match.params.id,
    );

    if (!props.items.length || !item) {
        return <h2>Loading item data...</h2>;
    }
    return (
        <div className='movie-card'>
            <h2>{title}</h2>
            <div className='movie-director'>
                Director: <em>{director}</em>
            </div>
            <div className='movie-metascore'>
                Metascore: <strong>{metascore}</strong>
            </div>
            <h3>Actors</h3>

            {stars.map((star) => (
                <div key={star} className='movie-star'>
                    {star}
                </div>
            ))}
            <button
                className='md-button'
                onClick={() => push(`/update-movie/${item.id}`)}
            >
                Edit
            </button>
        </div>
    );
};

export default MovieCard;
