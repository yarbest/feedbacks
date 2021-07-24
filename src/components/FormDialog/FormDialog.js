import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Context } from '../context/context';

export default function FormDialog({ dataToEdit }) {
    dataToEdit = dataToEdit || {};
    const { setFeedbacks } = useContext(Context);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(dataToEdit.title || '');
    const [description, setDescription] = useState(dataToEdit.description || '');
    const [rating, setRating] = useState(description.rating || 2);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = (e) => {
        if (title.trim() === '' || description.trim() === '') return;
        if (e.type === 'keypress' && e.key !== 'Enter') return; //при фокусе на input и textarea, если они заполнены, то при нажатии на enter можно отправить

        setOpen(false);

        if ('id' in dataToEdit) {
            console.log(1);
            setFeedbacks((feedbacks) => {
                return feedbacks.map((feedback) =>
                    feedback.id === dataToEdit.id ? { ...feedback, title, description, rating } : feedback
                );
            });
            return;
        }

        setFeedbacks((feedbacks) => {
            return [
                ...feedbacks,
                {
                    id: +Date.now(),
                    title: title,
                    description: description,
                    rating: rating,
                },
            ];
        });
    };

    console.log('dataToEdit.id', dataToEdit.id);

    return (
        <div>
            <Grid container justifyContent="center">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    {dataToEdit.id ? 'Edit feedback' : 'Send feedback'}
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dataToEdit.id ? 'Edit feedback' : 'Send feedback'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>To leave your feedback, please enter title, rating and description here.</DialogContentText>
                    <Box component="fieldset" borderColor="transparent">
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newRating) => {
                                setRating(newRating);
                            }}
                        />
                    </Box>
                    <Box component="fieldset" mb={2} borderColor="transparent">
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={(e) => handleSend(e)}
                            value={title}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                        />
                    </Box>
                    <Box component="fieldset" mb={2} borderColor="transparent">
                        <TextareaAutosize
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyPress={(e) => handleSend(e)}
                            value={description}
                            minRows={3}
                            maxRows={5}
                            placeholder="Description"
                            style={{ width: '100%', resize: 'none' }}
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
