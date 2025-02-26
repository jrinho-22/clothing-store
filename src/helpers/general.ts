export const getPartialCard = (cardNumber: string | undefined) => {
    return cardNumber && "****" + cardNumber.slice(-4)
}
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));