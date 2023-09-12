const initialState = {
    modalOpen: false,
    boardOpen: false
};

export const setModal = (bool) => ({
    type: 'setModal',
    payload: bool
});

export const setBoard = (bool) => ({
    type: 'setBoard',
    payload: bool
});

const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'setModal':
            return {
                ...state,
                modalOpen: action.payload
            };
        case 'setBoard':
            return {
                ...state,
                boardOpen: action.payload
            };
        default:
            return state;
    }
};

export default Reducers;