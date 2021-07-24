import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Context } from '../context/context';
import FeedbacksList from '../FeedbacksList/FeedbacksList';
import EditPost from '../EditPost/EditPost';

export default function App() {
    const [feedbacks, setFeedbacks] = useState(JSON.parse(localStorage.getItem('feedbacks')) || []);

    //editPostId очень важный стейт, он показывает какой пост редактируем и так же показывается в url
    const [editPostId, setEditPostId] = useState(JSON.parse(localStorage.getItem('editPostId')) || '');

    useEffect(() => localStorage.setItem('feedbacks', JSON.stringify(feedbacks)), [feedbacks]);

    useEffect(() => localStorage.setItem('editPostId', JSON.stringify(editPostId)), [editPostId]);
    return (
        <Router>
            <Switch>
                <Route path={`/post/${editPostId}`}>
                    <Context.Provider value={{ setFeedbacks }}>
                        <EditPost feedback={feedbacks.find((feedback) => feedback.id === editPostId)} />
                    </Context.Provider>
                </Route>
                <Route path={`/`}>
                    <Context.Provider value={{ setFeedbacks, setEditPostId }}>
                        <FeedbacksList feedbacks={feedbacks} />
                    </Context.Provider>
                </Route>
            </Switch>
        </Router>
    );
}
