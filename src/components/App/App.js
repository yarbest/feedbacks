import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Context } from '../context/context';
import FeedbacksList from '../FeedbacksList/FeedbacksList';
import EditPost from '../EditPost/EditPost';
import feedbacksReducer from './feedbacksReducer';

export default function App() {
    const [state, dispatch] = useReducer(feedbacksReducer, {
        feedbacks: JSON.parse(localStorage.getItem('feedbacks')) || [],
        editPostId: JSON.parse(localStorage.getItem('editPostId')) || '',
    });
    const { feedbacks, editPostId } = state;

    useEffect(() => {
        localStorage.setItem('feedbacks', JSON.stringify(state.feedbacks));
        localStorage.setItem('editPostId', JSON.stringify(state.editPostId));
    }, [state]);

    return (
        <Context.Provider value={{ feedbacks, editPostId, dispatch }}>
            <Router>
                <Switch>
                    <Route path={'/post/:editPostId'} component={EditPost}></Route>
                    <Route path={'/'} component={FeedbacksList}></Route>
                </Switch>
            </Router>
        </Context.Provider>
    );
}

//Если внутри одного пути в Route необходимо отобразить несколько компонентов, можно написать
// render={() => { return (<Cmp1/> <Cmp2/>) z}}

//До внедрения useReducer:
// //содержимое useState() обернул в колбэк, чтобы обращение к хранилищу происходтло только 1 раз
// const [feedbacks, setFeedbacks] = useState(() => JSON.parse(localStorage.getItem('feedbacks')) || []);
// //editPostId показывает какой пост редактируем и так же показывается в url
// const [editPostId, setEditPostId] = useState(() => JSON.parse(localStorage.getItem('editPostId')) || '');
// useEffect(() => localStorage.setItem('feedbacks', JSON.stringify(feedbacks)), [feedbacks]);
// useEffect(() => localStorage.setItem('editPostId', JSON.stringify(editPostId)), [editPostId]);
