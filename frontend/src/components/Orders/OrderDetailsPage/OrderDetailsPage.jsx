import './OrderDetailsPage.css'
import { fetchOrderById } from '../../../store/orders'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import OpenModalButton from '../../OpenModalButton/OpenModalButton'
import UpdateOrderModal from '../UpdateOrderModal/UpdateOrderModal'
import { deleteAOrder } from '../../../store/orders'
import { useNavigate } from 'react-router-dom'

export default function OrderDetailsPage(){
    const {orderId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const order = useSelector(state => state?.orders?.orderDetails)
    const samples = useSelector(state => state?.orders?.orderDetails?.Samples)

    useEffect(()=> {
        if(orderId){
            dispatch(fetchOrderById(orderId))
        }
    }, [dispatch, orderId])

    if(!order){
        return <p>Loading...</p>
    }

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteAOrder(orderId)).then(() => {
            navigate('/')
        })
    }

    return (
        <div className='order-details-main'>
            {order.status === 'placed' ? (
                <div className='order-details-container'>
                <div className='order-details-header'>
                    <p>Order {orderId}</p>
                </div>
                <div className='order-details-order-info'>
                    <p>Order Created At: {order.createdAt}</p>
                    <p>Number of Samples: {order.number_of_samples}</p>
                    <p>Order Status: {order.status}</p>
                    <p>Last Updated: {order.updatedAt}</p>
                </div>
                <div className='order-details-sample-info'>
                    {samples.map((sample) => (
                        <div key={sample.id} className='order-details-sample-card'>
                            <NavLink to={`/samples/${sample.id}`}>Sample Id: {sample.id}</NavLink>
                            <p>Sample Name: {sample.sample_name}</p>
                            <p>Sample Type: {sample.sample_type}</p>
                            <p>Test Type: {sample.test_type}</p>
                            <p>Sample Status: {sample.status}</p>
                            <p>Last Updated: {sample.updatedAt}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <OpenModalButton
                        buttonText="Update Order"
                        modalComponent={
                        <UpdateOrderModal 
                            order={order}
                            samples={samples}
                        />}
                    />
                    <button onClick={() => handleDeleteOrder(order.id)}>Delete the order</button>
                </div>
            </div>
            ) : (
                <div className='order-details-container'>
                    <div className='order-details-header'>
                        <p>Order {orderId}</p>
                    </div>
                    <div className='order-details-order-info'>
                        <p>Order Created At: {order.createdAt}</p>
                        <p>Number of Samples: {order.number_of_samples}</p>
                        <p>Order Status: {order.status}</p>
                        <p>Last Updated: {order.updatedAt}</p>
                    </div>
                    <div className='order-details-sample-info'>
                        {samples.map((sample) => (
                            <div key={sample.id} className='order-details-sample-card'>
                                <NavLink to={`/samples/${sample.id}`}>Sample Id: {sample.id}</NavLink>
                                <p>Sample Name: {sample.sample_name}</p>
                                <p>Sample Type: {sample.sample_type}</p>
                                <p>Test Type: {sample.test_type}</p>
                                <p>Sample Status: {sample.status}</p>
                                <p>Last Updated: {sample.updatedAt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}