const reducer = (state , action) => {
    switch (action.type) {
        case 'PLUS':
            return { ...state,plus:action.plus }
        case 'CHANGE':
            return {...state,showColor:action.showColor };
        default:
            return true
    }
};

export default reducer;