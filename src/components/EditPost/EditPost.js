import React from 'react';
import Rating from '@material-ui/lab/Rating';

import { Link } from 'react-router-dom';

import FormDialog from '../FormDialog/FormDialog';

export default function EditPost({ feedback: { id, title, description, rating } }) {
    //в dataToEdit передаем данные поста, который хотим редактировать
    return (
        <>
            <FormDialog dataToEdit={{ id, title, description, rating }} />

            <span>Rating:</span>
            <Rating name="read-only" value={rating} readOnly />
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <Link to={'/'}>Go Back </Link>
        </>
    );
}
