const ititialState = {
    feedbacks: [],
    editPostId: '',
};

export default function feedbacksReducer(state = ititialState, action) {
    switch (action.type) {
        case 'ADD_FEEDBACK':
            return {
                ...state,
                feedbacks: [...state.feedbacks, action.payload],
            };

        case 'DELETE_FEEDBACK':
            return {
                ...state,
                feedbacks: state.feedbacks.filter((feedback) => feedback.id !== action.payload),
            };

        case 'EDIT_FEEDBACK':
            const { id, title, rating, description } = action.payload;
            return {
                ...state,
                feedbacks: state.feedbacks.map((feedback) => (feedback.id === id ? { ...feedback, title, description, rating } : feedback)),
            };

        case 'SET_ID':
            return {
                ...state,
                editPostId: action.payload,
            };

        default:
            return state;
    }
}
