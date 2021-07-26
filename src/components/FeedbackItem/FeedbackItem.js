import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
            <Grid container alignItems="center">
                <span>Rating:</span>
                <Rating name="read-only" value={rating} readOnly />
                <Box ml="20px">Title: {title}</Box>

                <Box ml="auto" mr="40px">
                    <Link onClick={() => setEditPostId(id)} to={`/post/${id}`} style={{ marginRight: '20px' }}>
                        {/*При нажатии на кнопку редактирования поста, нужно в стейте из App.js поменять айди текущего поста для редактирования и этот же айди использовать в url*/}
                        <EditIcon />
                    </Link>
                    <DeleteIcon onClick={handleDelete} color="secondary" />
                </Box>
            </Grid>
        </>
    );
}
