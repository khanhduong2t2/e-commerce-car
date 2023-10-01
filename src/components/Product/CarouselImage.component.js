import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { convertToArrObject } from '../../helpers/handle_arr';

export default function CarouselImage() {
    const productDetails = useSelector(state => state.productDetails)
    let { detail } = productDetails;

    const [indexShow, setIndexShow] = useState(0);

    const getNextItem = (index, array) => {
        let nextItem = array.find(item => item.index === index + 1);
        return nextItem ? nextItem : array[0]
    }

    const getNewArrSupport = (index, arrSup, arrObj) => {
        let checkExists = arrSup.find(item => item.index === index);

        let newArrSup = [];

        if (!checkExists) {
            let lenArrSup = arrSup.length;
            newArrSup.push(arrObj.find(item => item.index === index))
            for (let i = index; i < index + lenArrSup - 1; i++) {

                newArrSup.push(getNextItem(newArrSup[newArrSup.length - 1].index, arrObj))
            }
        } else {
            newArrSup = [...arrSup]
        }

        return newArrSup;
    }


    const handleSelect = (selectedIndex) => {
        setIndexShow(selectedIndex);
        let newArr = getNewArrSupport(selectedIndex, arrListSupport, arrObject);
        setArrListSupport(newArr);
    };

    const handleClickItemImage = (index) => {
        setIndexShow(index);
        let newArr = getNewArrSupport(index, arrListSupport, arrObject);
        setArrListSupport(newArr);
    }

    // List Image Support
    let [arrObject, setArrObject] = useState([]);
    let [arrListSupport, setArrListSupport] = useState([]);

    useEffect(() => {
        if (detail && detail.link_image && detail.link_image.length > 0) {
            let arrObject = convertToArrObject(detail.link_image);
            setArrObject(arrObject)

            if (detail.link_image.length < 5) {
                setArrListSupport(arrObject)
            } else {
                let firstArr = arrObject.slice(0, 4);
                setArrListSupport(firstArr)
            }
        }
    }, [detail])
    return (
        <div id="container-carousel">
            <Carousel slide={false} className="carousel-show" activeIndex={indexShow} onSelect={handleSelect}>
                {
                    detail && detail.link_image && detail.link_image.length > 0 &&
                    detail.link_image.map((item, index) => {
                        return (
                            <Carousel.Item key={index} className="item-carousel">
                                <img width="80%" height="80%" src={item} alt="img" />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <ul className="carousel-list-image">
                {
                    arrListSupport && arrListSupport.length > 0 &&
                    arrListSupport.map((item, index) => {
                        return (
                            <li className="item-image" key={item.index} onClick={() => handleClickItemImage(item.index)}>
                                {
                                    item.index !== indexShow ?
                                        <img width="200px" height="120px" className="blurs-image" src={item.image} alt="img" />
                                        : <img width="200px" height="120px" src={item.image} alt="img" />
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
