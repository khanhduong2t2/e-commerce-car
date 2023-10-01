import React from 'react'
import { useDispatch } from 'react-redux';
import { UPDATE_NUMBER_STAR } from '../../Redux/Constants/FeedbackConstant';

export default function StarFeedback(props) {
    const dispatch = useDispatch();

    let star_light = props.number_star;
    let type = props.type;
    const items = [];

    const handleClickStar = (index) => {
        if (type === "PUBLIC") {
            dispatch({
                type: UPDATE_NUMBER_STAR,
                payload: {
                    numberStar: index + 1
                }
            })
        }
    }

    for (let index = 0; index < 5; index++) {
        if (index < star_light) {
            items.push(
                <span key={index} className="fa fa-star checked"
                    onClick={() => handleClickStar(index)}
                ></span>
            );
        } else {
            items.push(
                <span key={index} className="fa fa-star"
                    onClick={() => handleClickStar(index)}
                ></span>
            );
        }
    };

    return (
        <>{items}</>
    )
}