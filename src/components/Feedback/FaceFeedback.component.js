import React, { useState } from 'react'
import { FaRegFaceSadTear, FaFaceSadTear, FaRegFaceMeh, FaRegFaceGrinStars, FaFaceMeh, FaFaceGrinStars } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { SET_TYPE_FEEL } from '../../Redux/Constants/FeedbackConstant';
export default function FaceFeedback(props) {
    const dispatch = useDispatch();

    let { typeFeel, disable_feedback } = props;

    let [isSad, setIsSad] = useState(false);
    let [isMeh, setIsMeh] = useState(false);
    let [isHappy, setIsHappy] = useState(false);

    const onChangeFace = (sad, meh, happy) => {
        if (!disable_feedback) {
            setIsSad(sad)
            setIsMeh(meh)
            setIsHappy(happy)

            if (sad && !meh && !happy) {
                dispatch({
                    type: SET_TYPE_FEEL,
                    payload: {
                        type_feel: "sad"
                    }
                })
            } else if (!sad && meh && !happy) {
                dispatch({
                    type: SET_TYPE_FEEL,
                    payload: {
                        type_feel: "meh"
                    }
                })
            } else if (!sad && !meh && happy) {
                dispatch({
                    type: SET_TYPE_FEEL,
                    payload: {
                        type_feel: "happy"
                    }
                })
            } else {
                dispatch({
                    type: SET_TYPE_FEEL,
                    payload: {
                        type_feel: null
                    }
                })
            }
        }
    }

    return (
        <>
            {
                (isSad || typeFeel === "sad") ?
                    <FaFaceSadTear className="icon-sad-yellow"
                        onClick={() => onChangeFace(false, false, false)}
                    ></FaFaceSadTear>
                    :
                    <FaRegFaceSadTear
                        onClick={() => onChangeFace(true, false, false)}
                    ></FaRegFaceSadTear>
            }
            {
                (isMeh || typeFeel === "meh") ?
                    <FaFaceMeh className="icon-meh-grey"
                        onClick={() => onChangeFace(false, false, false)}
                    ></FaFaceMeh>
                    :
                    <FaRegFaceMeh
                        onClick={() => onChangeFace(false, true, false)}
                    ></FaRegFaceMeh>
            }
            {
                (isHappy || typeFeel === "happy") ?
                    <FaFaceGrinStars className="icon-face-star"
                        onClick={() => onChangeFace(false, false, false)}
                    ></FaFaceGrinStars>
                    :
                    <FaRegFaceGrinStars
                        onClick={() => onChangeFace(false, false, true)}
                    ></FaRegFaceGrinStars>
            }

        </>
    )
}