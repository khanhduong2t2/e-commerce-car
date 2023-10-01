const convertToArrObject = (arr) => {
    let newArr = [];

    arr.forEach((item, index) => {
        newArr.push({
            index: index,
            image: item
        })
    })
    return newArr
}

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

module.exports = {
    getNextItem,
    getNewArrSupport,
    convertToArrObject
}