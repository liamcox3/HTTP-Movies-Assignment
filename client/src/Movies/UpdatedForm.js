import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: "",
};

const UpdateForm = (props) => {
    const { push } = useHistory();
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5001/itemById/${id}`)
            .then((res) => {
                // res.data
                setItem(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
            value = parseInt(value, 10);
        }

        setItem({
            ...item,
            [ev.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:3333/items/${id}`, item)
            .then((res) => {
                // res.data
                props.setItems(res.data);
                push(`/item-list/${id}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={item.title}
                />

                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={item.director}
                />

                <input
                    type='string'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='MetaScore'
                    value={item.metascore}
                />

                <input
                    type='string'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Stars'
                    value={item.stars}
                />

                <button className='md-button form-button'>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
