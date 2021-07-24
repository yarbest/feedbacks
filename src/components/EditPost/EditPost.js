import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Link } from 'react-router-dom';

import FormDialog from '../FormDialog/FormDialog';

export default function EditPost({ feedback: { id, title, description, rating } }) {
    //в dataToEdit передаем данные поста, который хотим редактировать
    return (
        <div style={{ marginLeft: '50px' }}>
            <FormDialog dataToEdit={{ id, title, description, rating }} />

            <Grid container alignItems="center">
                <span>Rating:</span>
                <Rating name="read-only" value={rating} readOnly />
            </Grid>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <Link to={'/'}>
                <KeyboardBackspaceIcon />
            </Link>
        </div>
    );
}
