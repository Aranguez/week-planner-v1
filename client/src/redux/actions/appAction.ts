export const trueFalse = thingToShow => {
    return {
        type: 'OPEN_CLOSE',
        payload: {
            thingToShow,
            value: false
        }
    }
}

export const showEditModal = taskToEdit => {
    return {
        type: 'EDIT_MODAL',
        payload: {
            thingToShow: 'editModal',
            taskToEdit
        }
    }
}

export const configure = (lang, dark) => {
    return {
        type: 'CONFIGURE',
        payload: {
            lang,
            dark
        }
    }
}