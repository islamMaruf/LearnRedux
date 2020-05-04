const axios = require('axios');
const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: true,
    payload: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_SUCCESS';

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};

const fetchUserSuccess = users => {
    return {
        type: FETCH_SUCCESS,
        payload: users
    }
};

const fetchUserFailure = error => {
    return {
        type: FETCH_ERROR,
        payload: error
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST :
            return {
                ...initialState,
                loading: true
            };
        case FETCH_SUCCESS :
            return {
                ...initialState,
                loading: false,
                payload: action.payload
            };
        case FETCH_ERROR :
            return {
                ...initialState,
                loading: false,
                payload: [],
                error: action.error
            }
    }
};

function fetchUsers() {
    return function (dispatch) {
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error))
            })

    }

}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    console.log(store.getState())
});
store.dispatch(fetchUsers);
