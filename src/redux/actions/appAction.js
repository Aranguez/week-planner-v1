export const trueFalse = thingToShow => {
    console.log(thingToShow)
    return {
        type: 'OPEN_CLOSE',
        payload: {
            thingToShow,
            value: false
        }
    }
}