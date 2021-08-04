import { useContext } from 'react';
import Typography from '@material-ui/core/Typography';

import { Context } from '../context/context';
import FormDialog from '../FormDialog/FormDialog';
import FeedbackItem from '../FeedbackItem/FeedbackItem';

export default function FeedbacksList() {
    const { feedbacks } = useContext(Context);

    return (
        <>
            <FormDialog />

            <ul>
                <Typography color="primary" gutterBottom>
                    <span>Feedbacks:</span>
                </Typography>
                {feedbacks.map((feedback) => {
                    return <FeedbackItem key={feedback.id} feedback={feedback} />;
                })}
            </ul>
        </>
    );
}
