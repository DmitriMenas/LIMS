import "./SampleDetailPage.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteASample, fetchSampleById } from "../../../store/samples"
import { deleteAOrder, fetchOrderById, updateUserOrder } from "../../../store/orders"
import OpenModalButton from "../../OpenModalButton/OpenModalButton"
import UpdateSampleModal from '../UpdateSampleModal/UpdateSampleModal'

export default function SampleDetailPage(){
    const sample = useSelector(state => state?.samples?.sampleDetails)
    const order = useSelector(state => state?.orders?.orderDetails)
    const dispatch = useDispatch()
    const {sampleId} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(sampleId){
            dispatch(fetchSampleById(sampleId))
        }
    }, [dispatch, sampleId])
    
    
    useEffect(() => {
        if (sample?.orderId) {
            dispatch(fetchOrderById(sample.orderId))
        }
    }, [dispatch, sample?.orderId])
    
    if(!sample){
        return <p>Loading...</p>
    }

    const handleDeleteSample = () => {
      
        if (order.number_of_samples === 1) {
           dispatch(deleteAOrder(order.id)).then(() => {
                navigate('/')
            })
        } else {
            dispatch(deleteASample(sample.id)).then(()=> {
                dispatch(updateUserOrder(order.id, {
                    number_of_samples: order.number_of_samples - 1
                  })).then(()=>{
                    navigate('/')
                })
            })
        }
    }  
    
    return (
        <div className='sample-details-main'>
            {sample.status === 'placed' ? (
                <div className="sample-details-container">
                    <div className="sample-details-card">
                        <p>Sample Id: {sample.id}</p>
                        <p>Sample Name: {sample.sample_name}</p>
                        <p>Sample Type: {sample.sample_type}</p>
                        <p>Test Type: {sample.test_type}</p>
                        <p>Sample Status: {sample.status}</p>
                        <p>Last Updated: {sample.updatedAt}</p>
                    </div>
                    {sample && sample.id && (
                    <OpenModalButton 
                        buttonText="Update Sample"
                        modalComponent={
                        <UpdateSampleModal 
                            order={order}
                            sample={sample}
                        />
                        }
                    />
                    )}
                    <button onClick={() => handleDeleteSample(sample.id, order.id)}>Delete the sample</button>
                </div>
            ) : (
                <div className="sample-details-container">
                    <div className="sample-details-card">
                        <p>Sample Id: {sample.id}</p>
                        <p>Sample Name: {sample.sample_name}</p>
                        <p>Sample Type: {sample.sample_type}</p>
                        <p>Test Type: {sample.test_type}</p>
                        <p>Sample Status: {sample.status}</p>
                        <p>Last Updated: {sample.updatedAt}</p>
                    </div>
                </div>
            )}
        </div>
    )
}