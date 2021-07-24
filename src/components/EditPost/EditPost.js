import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Link } from 'react-router-dom';

import FormDialog from '../FormDialog/FormDialog';

export default function EditPost({ feedback: { id, title, description, rating } }) {
    //в dataToEdit передаем данные поста, который хотим редактировать, они нужны не только для отображения, но и для вставки в форму, чтобы можно было редактировать существующую информацию, а не с нуля заполнять форму
    return (
        <Box ml="50px">
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
        </Box>
    );
}
