import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link } from 'react-router-dom';
import { Context } from '../context/context';

export default function FeedbackItem({ feedback: { id, title, description, rating } }) {
    const { dispatch } = useContext(Context);

    const handleDelete = () => dispatch({ type: 'DELETE_FEEDBACK', payload: id });
    const handleEdit = () => dispatch({ type: 'SET_ID', payload: id });

    return (
        <Grid container alignItems="center">
            <span>Rating:</span>
            <Rating name="read-only" value={rating} readOnly />
            <Box ml="20px">Title: {title}</Box>

            <Box ml="auto" mr="40px">
                <Link onClick={handleEdit} to={`/post/${id}`} style={{ marginRight: '20px' }}>
                    <EditIcon />
                </Link>
                <DeleteIcon onClick={handleDelete} color="secondary" />
            </Box>
        </Grid>
    );
}
