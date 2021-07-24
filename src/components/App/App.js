import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Context } from '../context/context';
import FormDialog from '../FormDialog/FormDialog';
import FeedbacksList from '../FeedbacksList/FeedbacksList';
import EditPost from '../EditPost/EditPost';

export default function App() {
    const [feedbacks, setFeedbacks] = useState(JSON.parse(localStorage.getItem('feedbacks')) || []);

    const [editPostId, setEditPostId] = useState('');

    useEffect(() => {
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }, [feedbacks]);

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
                        <FormDialog />
                        <FeedbacksList feedbacks={feedbacks} />
                    </Context.Provider>
                </Route>
            </Switch>
        </Router>
    );
}
