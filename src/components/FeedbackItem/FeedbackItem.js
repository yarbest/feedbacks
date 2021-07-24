import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import { Context } from '../context/context';

export default function FeedbackItem({ feedback: { id, title, description, rating } }) {
    const { setEditPostId } = useContext(Context);

    return (
        <>
            <Grid container alignItems="center">
                <span>Rating:</span>
                <Rating name="read-only" value={rating} readOnly />
                <p style={{ marginLeft: '20px' }}>Title: {title}</p>
                <Link onClick={() => setEditPostId(id)} to={`/post/${id}`} style={{ marginLeft: 'auto', marginRight: '20px' }}>
                    Edit post
                </Link>
            </Grid>
        </>
    );
}
