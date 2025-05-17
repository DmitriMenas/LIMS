import './LPE.css'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchOrders } from '../../../store/orders'
import { fetchSamples } from '../../../store/samples'
import { useEffect, useState } from 'react'

export default function LPE(){
    const dispatch = useDispatch()
    const orders = useSelector(state => state?.orders?.orders)
    const samples = useSelector(state => state?.samples?.samples)
    const [filterStatus, setFilterStatus] = useState(null); // default status
    
    useEffect(()=> {
        dispatch(fetchOrders())
        dispatch(fetchSamples())
    }, [dispatch])


    return (
        <div className='lpe-main'>
            <div className='lpe-body'>
                <div className='lpe-samples-section'>
                    <h2>Samples:</h2>
                    <div className='lpe-samples-section-header'>
                        <button className='section-header-button-1' onClick={() => setFilterStatus(null)}>All</button>
                        <button className='section-header-button-1' onClick={() => setFilterStatus('placed')}>Placed</button>
                        <button className='section-header-button-2' onClick={() => setFilterStatus('in progress')}>In Progress</button>
                        <button className='section-header-button-3' onClick={() => setFilterStatus('completed')}>Completed</button>
                    </div>
                    <div className='lpe-samples-list'>
                        {samples
                            ?.filter(sample => !filterStatus || sample?.status === filterStatus)
                            .map((sample) =>(
                                <div className='lpe-sample-card' key={sample?.id}>
                                    <div className='lpe-sample-solo-card'>
                                        <NavLink to={`/samples/${sample.id}`}><p>Sample Number: {sample?.id}</p></NavLink>
                                        <p>Sample Name: {sample?.sample_name}</p>
                                        <p>Sample Type: {sample?.sample_type}</p>
                                        <p>Test Type: {sample?.test_type}</p>
                                        <p>Order Number: {sample?.Order.id}</p>
                                        <p>Sample Status: {sample?.status}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
                <div className='lpe-orders-section'>
                    <h2>Orders:</h2>
                    <div className='lpe-orders-section-header'>
                        <button className='section-header-button-1' onClick={() => setFilterStatus(null)}>All</button>
                        <button className='section-header-button-1' onClick={() => setFilterStatus('placed')}>Placed</button>
                        <button className='section-header-button-2' onClick={() => setFilterStatus('in progress')}>In Progress</button>
                        <button className='section-header-button-3' onClick={() => setFilterStatus('completed')}>Completed</button>
                    </div>
              
                    <div className='lpe-orders-list'>
                    {orders
                        ?.filter(order => !filterStatus || order.status === filterStatus)
                        .map((order) => (
                            <div key={order.id} className="lpe-order-card">
                            <div className='lpe-orders-solo-card'>
                                <NavLink to={`/orders/${order.id}`}><p>Order number: {order?.id}</p></NavLink>
                                <p>Number of Samples: {order?.number_of_samples}</p>
                                <p>Order price: {order?.total_price}</p>
                                <p>Order status: {order?.status}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='calender'>
                    <iframe 
                        src="https://calendar.google.com/calendar/embed?src=info%40chemhistory.com&ctz=America%2FLos_Angeles"
                        >
                    </iframe>
                </div>
            </div>
        </div>
        
    )
}