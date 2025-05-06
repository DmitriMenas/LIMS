import './LPC.css'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchUserOrders } from '../../../store/orders'
import { fetchUserSamples } from '../../../store/samples'
import { useEffect, useState } from 'react'

export default function LPC({user}){
    const dispatch = useDispatch()
    const orders = useSelector(state => state?.orders?.userOrders)
    const samples = useSelector(state => state?.samples?.userSamples)
    const [filterStatus, setFilterStatus] = useState(null);


    
    
    
    
    useEffect(()=> {
        dispatch(fetchUserOrders())
        dispatch(fetchUserSamples())
    }, [dispatch])

  
    
 
    return (
        <div className='lpc-main'>
            <div className='lpc-body'>
                <div className='lpc-orders-section'>
                    <div className='lpc-orders-section-header'>
                        <button className='section-header-button-1' onClick={() => setFilterStatus(null)}>All</button>
                        <button className='section-header-button-1' onClick={() => setFilterStatus('placed')}>Placed</button>
                        <button className='section-header-button-2' onClick={() => setFilterStatus('in progress')}>In Progress</button>
                        <button className='section-header-button-3' onClick={() => setFilterStatus('completed')}>Completed</button>
                    </div>  
                    <div className='lpc-orders-list'>
                    {orders
                        ?.filter(order => !filterStatus || order.status === filterStatus)
                        .map((order) => (
                            <div key={order.id} className="lpc-order-card">
                                <div className='lpc-orders-solo-card'>
                                    <NavLink to={`/orders/${order.id}`}><p>Order number: {order.id}</p></NavLink>
                                    <p>Number of Samples: {order.number_of_samples}</p>
                                    <p>Order price: {order.total_price}</p>
                                    <p>Order status: {order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                
                </div>
                <div className='lpc-samples-section'>
                    <div className='lpc-orders-section-header'>
                        <button className='section-header-button-1' onClick={() => setFilterStatus(null)}>All</button>
                        <button className='section-header-button-1' onClick={() => setFilterStatus('placed')}>Placed</button>
                        <button className='section-header-button-2' onClick={() => setFilterStatus('in_progress')}>In Progress</button>
                        <button className='section-header-button-3' onClick={() => setFilterStatus('completed')}>Completed</button>
                    </div>
                    <div className='lpc-samples-list'>
                        {samples
                            ?.filter(sample => !filterStatus || sample.status === filterStatus)
                            .map((sample) => (
                                <div key={sample.id} className='lpc-sample-card'>
                                    <div className='lpc-samples-solo-card'>
                                        <NavLink to={`/samples/${sample.id}`}><p>Sample Number: {sample.id}</p></NavLink>
                                        <p>Sample Name: {sample.sample_name}</p>
                                        <p>Sample Type: {sample.sample_type}</p>
                                        <p>Test Type: {sample.test_type}</p>
                                        <p>Order Number: {sample.Order.id}</p>
                                        <p>Sample Status: {sample.status}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}