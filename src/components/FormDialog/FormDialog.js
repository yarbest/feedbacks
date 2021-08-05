import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Context } from '../context/context';

export default function FormDialog({ values = { title: '', description: '', rating: 2 } }) {
    //values появится, когда будем вызывать FormDialog для редактирования поста, тут будут храниться старые данные поста, который будем редактировать, главное не ставить данные по умолчанию для id, иначе условие в handleSend сломается

    const { dispatch } = useContext(Context);

    const [feedback, setFeedback] = useState(values); //feedback - локальный state, в котром лежит title, description, rating, его будем отправлять через reducer в стейт из App.js
    const { title, description, rating } = feedback;

    //От Material UI
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSend = (e) => {
        if (title.trim() === '' || description.trim() === '') return;
        if (e.type === 'keypress' && e.key !== 'Enter') return; //при фокусе на input и textarea, если они заполнены, то при нажатии на enter можно отправить

        setOpen(false);

        if ('id' in values) {
            dispatch({ type: 'EDIT_FEEDBACK', payload: { ...feedback, id: values.id } });
        } else {
            dispatch({ type: 'ADD_FEEDBACK', payload: { ...feedback, id: +Date.now() } });
        }
    };

    //меняем локальный state
    const handleTitleChange = (e) => setFeedback((state) => ({ ...state, title: e.target.value }));
    const handleDescChange = (e) => setFeedback((state) => ({ ...state, description: e.target.value }));
    const handleRatingChange = (rating) => setFeedback((state) => ({ ...state, rating }));

    return (
        <div>
            <Grid container justifyContent="center">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    {values.id ? 'Edit feedback' : 'Send feedback'}
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{values.id ? 'Edit feedback' : 'Send feedback'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>To leave your feedback, please enter title, rating and description here.</DialogContentText>
                    <Box component="fieldset" borderColor="transparent">
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, rating) => {
                                handleRatingChange(rating);
                            }}
                        />
                    </Box>
                    <Box component="fieldset" mb={2} borderColor="transparent">
                        <TextField
                            onChange={handleTitleChange}
                            onKeyPress={(e) => handleSend(e)}
                            value={title}
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                        />
                    </Box>
                    <Box component="fieldset" mb={2} borderColor="transparent">
                        <TextField
                            onChange={handleDescChange}
                            onKeyPress={(e) => handleSend(e)}
                            value={description}
                            fullWidth
                            label="Description"
                            name="description"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSend} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
