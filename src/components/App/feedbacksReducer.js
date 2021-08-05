const ititialState = {
    feedbacks: [],
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
            const { id, ...editedData } = action.payload;
            return {
                ...state,
                feedbacks: state.feedbacks.map((feedback) => (feedback.id === id ? { ...feedback, ...editedData } : feedback)),
                //...feedback написано для того, если вдруг мы не все данные собираемся менять, которые находятся в editedData и нужно оставить старые
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
