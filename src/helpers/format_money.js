const formattedAmount = (amount) => {
    return (
        amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        })
    )
}

module.exports = {
    formattedAmount
}