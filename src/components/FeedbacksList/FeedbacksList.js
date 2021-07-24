import FeedbackItem from '../FeedbackItem/FeedbackItem';
import Typography from '@material-ui/core/Typography';

export default function FeedbacksList({ feedbacks }) {
    return (
        <ul>
            <Typography color="primary" gutterBottom>
                <span>Feedbacks:</span>
            </Typography>
            {feedbacks.map((feedback) => {
                return <FeedbackItem key={feedback.id} feedback={feedback} />;
            })}
        </ul>
    );
}
