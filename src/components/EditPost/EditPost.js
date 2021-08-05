import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Context } from '../context/context';
import FormDialog from '../FormDialog/FormDialog';

export default function EditPost() {
    const { feedbacks } = useContext(Context);
    const { editPostId } = useParams();

    const feedback = feedbacks.find((item) => {
        console.log('find');
        return item.id === +editPostId; //editPostId из url берется как строка
    });

    //Использование useMemo принесло проблемы, когда я редактирую пост, то состояние меняется,
    //но на странице для редактирования поста данные меняются только после обновления страницы
    //если я в отслеживаемые элементы поставлю [editPostId, feedbacks], то никаких изменений по сравнению без мемоизации не будет
    //пробовал добавлять в state из App.js новое свойство со значениями поста, который собираемся редактировать (чтобы их отображать в этом компоненте),
    //и за ним уже следить в useMemo, но тогда find опять не оптимизирован
    // const feedback = useMemo(() => {
    //     return feedbacks.find((item) => {
    //         console.log('find');
    //         return item.id === editPostId;
    //     });
    // }, [editPostId]);

    const { rating, title, description } = feedback;

    //в values передаем данные поста, который хотим редактировать, они нужны не только для отображения, но и для вставки в форму, чтобы можно было редактировать существующую информацию, а не с нуля заполнять форму
    return (
        <Box ml="50px">
            <FormDialog values={feedback} />

            <Grid container alignItems="center">
                <span>Rating:</span>
                <Rating name="read-only" value={rating} readOnly />
            </Grid>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <Link to={'/'}>
                <KeyboardBackspaceIcon />
            </Link>
        </Box>
    );
}
