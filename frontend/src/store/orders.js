import { csrfFetch } from '../store/csrf';

//containts
const SET_ORDERS = "orders/setOrders";
const SET_USER_ORDERS = "orders/setUserOrders"
const SET_ORDER_DETAILS = "orders/setOrderDetails"
const CREATE_ORDER = "order/createOrder"




//action creators
//get all orders
const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        payload: orders
    }
}

//get all users orders
const setUserOrders = (orders) => {
    return {
        type: SET_USER_ORDERS,
        payload: orders
    }
}

//get order by ID
const setOrderDetails = (order) => {
    return {
        type: SET_ORDER_DETAILS,
        payload: order
    }
}

//create a new order
const createANewOrder = (order) => {
    return {
        type: CREATE_ORDER,
        payload: order
    }
}




//thunks
//get all spots
export const fetchOrders = () => async (dispatch) => {
    const response = await fetch('api/orders');
    const data = await response.json();
    dispatch(setOrders(data.Orders));
    return response
}

//get all users orders
export const fetchUserOrders = () => async (dispatch) => {
    const response = await fetch('/api/orders/current')
    const data = await response.json()
    dispatch(setUserOrders(data.userOrders))
    return response
}

//get order by id
export const fetchOrderById = (orderId) => async (dispatch) =>{
    const response = await fetch(`/api/orders/${orderId}`)
    const data = await response.json()
    dispatch(setOrderDetails(data))
    return response
}

//create an order
export const createOrder = (orderData) => async (dispatch) => {
    const response = await csrfFetch(`/api/orders/current`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
    })

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating order:", errorData);
        return errorData;
      }
    
      if (response.ok) {
        const newOrder = await response.json();
        dispatch(createANewOrder(newOrder));
        return newOrder;
      }
}





//initial state
const initialState = {
    orders: [],
    userOrders: [],
    orderDetails: null
}

//reducer
const orderReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ORDERS:
            return {...state, orders: action.payload}
        case SET_USER_ORDERS:
            return {...state, userOrders: action.payload}
        case SET_ORDER_DETAILS:
            return {...state, orderDetails: action.payload}
        case CREATE_ORDER:
            return {...state, orders: [...state.orders, action.payload]};
        default:
            return state
    }
}

export default orderReducer