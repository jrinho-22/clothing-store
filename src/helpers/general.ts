export const getPartialCard = (cardNumber: string | undefined) => {
    return cardNumber && "****" + cardNumber.slice(-4)
}