const initialState = {
    modalOpen: false
};

export const setModal = (bool) => ({
    type: 'setModal',
    payload: bool
});

const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'setModal':
            return {
                ...state,
                modalOpen: action.payload
            };
        default:
            return state;
    }
};

export default Reducers;