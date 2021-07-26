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
                        {/*Сюда отправляю контекст, так как в EditPost вызывается FormDialog и там должен меняться стейт feedbacks */}
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
//этот путь path={`/post/${editPostId}`} можно было заменить на path={'/post/:idEditPost'}
//затем внутри EditPost написать const {idEditPost} = useParams()
//этот idEditPost возьмется из url и дальше передастся в FormDialog, чтобы понять какой пост редактировать
//это можно было бы сделать, если бы у нас не было стейта editPostId
