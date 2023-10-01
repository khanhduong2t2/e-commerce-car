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
module.exports = {
    convertToArrObject
}