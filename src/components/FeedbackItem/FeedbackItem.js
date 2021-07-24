import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link } from 'react-router-dom';
import { Context } from '../context/context';

export default function FeedbackItem({ feedback: { id, title, description, rating } }) {
    const { setFeedbacks, setEditPostId } = useContext(Context); //функция setEditPostId необходима для изменения в главном стейте айди объекта, который в данный момент собираемся редактировать

    const handleDelete = () => {
        setFeedbacks((feedbacks) => feedbacks.filter((feedback) => feedback.id !== id));
    };

    return (
        <>
            <Grid container alignItems="center" style={{ paddingRight: '40px' }}>
                <span>Rating:</span>
                <Rating name="read-only" value={rating} readOnly />
                <p style={{ marginLeft: '20px' }}>Title: {title}</p>
                <Link onClick={() => setEditPostId(id)} to={`/post/${id}`} style={{ marginLeft: 'auto', marginRight: '20px' }}>
                    <EditIcon color="primary" />
                </Link>

                <DeleteIcon onClick={handleDelete} style={{ color: 'red' }} />
            </Grid>
        </>
    );
}
