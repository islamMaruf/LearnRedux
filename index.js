const redux = require('redux');
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

//actions

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';


function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}
function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'second redux action'
    }
}


const cakeState = {
    numberOfCakes: 10
}
const iceCreamState = {
    numberOfIceCreams : 10
}
//reducers
const cakeReducers = (state = cakeState, action) => {
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

const iceCreamReducers = (state = iceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM :
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }
        default:
            return state;
    }
};


const rootReducer = combineReducer({
    cake : cakeReducers,
    iceCream : iceCreamReducers
});

const store = createStore(rootReducer);
console.log('initial state '+ store.getState().cake.numberOfCakes +' '+ store.getState().iceCream.numberOfIceCreams );
const unsubscribe = store.subscribe(() => console.log('updated state ' +store.getState().cake.numberOfCakes +' '+ store.getState().iceCream.numberOfIceCreams))
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();