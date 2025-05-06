import { csrfFetch } from "./csrf";

//constants
const SET_SAMPLES = "samples/setSamples"
const SET_USER_SAMPLES = "userSamples/setUserSamples"
const CREATE_SAMPLE = "sample/CreateSample"
const UPDATE_SAMPLE = "sample/UpdateSample"

//action creators
//get all samples
const setSamples = (samples) => {
    return {
        type: SET_SAMPLES,
        payload: samples
    }
}

//get samples by user
const setUserSamples = (samples) => {
    return {
        type: SET_USER_SAMPLES,
        payload: samples
    }
}

const createANewSample = (sample) => {
    return {
        type: CREATE_SAMPLE,
        payload: sample
    }
}

const updateSample = (sample) => {
    return {
        type: UPDATE_SAMPLE,
        payload: sample
    }
}


//thunks
//get all samples
export const fetchSamples = () => async (dispatch) => {
    const response = await fetch('/api/samples')
    const data = await response.json()
    dispatch(setSamples(data.Samples))
    return response
}

//get all users samples
export const fetchUserSamples = () => async (dispatch) => {
    const response = await fetch('/api/samples/current')
    const data = await response.json()
    dispatch(setUserSamples(data.userSamples))
    return response
}

//create a sample
export const createSample = (sampleData) => async (dispatch) => {
    const response = await csrfFetch(`/api/samples/current`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData)
    })
    if(!response.ok){
        const errorData = await response.json()
        console.error("Error creating sample:", errorData)
        return errorData
    }

    if(response.ok){
        const newSample = await response.json()
        dispatch(createANewSample(newSample))
        return newSample
    }
}

//update a sample
export const updateUserSample = (sampleId, sampleData) => async (dispatch) => {
    const response = await csrfFetch(`/api/samples/${sampleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData)
    })
    const updatedSample = await response.json()
    dispatch(updateSample(updatedSample))
    return updatedSample
}

//delete a sample
export const deleteASample = (sampleId) => async (dispatch) => {
    const response = await csrfFetch(`/api/samples/${sampleId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const deletedSample = await response.json()
    if(deletedSample){
        dispatch(fetchUserSamples())
        return deletedSample
    }
}



//initial state
const initialState = {
    samples: [],
    userSamples: []
}

//reducer
const sampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SAMPLES:
            return {...state, samples: action.payload}
        case SET_USER_SAMPLES:
            return {...state, userSamples: action.payload}
        case UPDATE_SAMPLE:
            return {...state,
                samples: state.samples.map((s) =>
                    s.id === action.payload.id ? action.payload : s
                )
            }
        default:
            return state
    }

}

export default sampleReducer