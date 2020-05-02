//actions

const BUY_CAKE = 'BUY_CAKE';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}

const initialState = {
    numberOfCakes: 10
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE :
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state;
    }
};