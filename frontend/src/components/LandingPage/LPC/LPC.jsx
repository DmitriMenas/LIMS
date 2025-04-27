import './LPC.css'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchUserOrders } from '../../../store/orders'
import { useEffect, useState } from 'react'

export default function LPC({user}){
    const dispatch = useDispatch()
    const orders = useSelector(state => state?.orders?.userOrders)
    // const samples = useSelector(state => state?.orders?.userOrders?.samples)
    const [filterStatus, setFilterStatus] = useState(null); // default status

    
    
    
    
    useEffect(()=> {
        dispatch(fetchUserOrders())
    }, [dispatch])
    
 
    return (
        <div className='lpc-main'>
            <div className='lpc-body'>
                {/* use the following to create employees later 
                */}
                {/* {user?.role === 'admin' && (
                    <NavLink to='/signup'>SignUp</NavLink>
                )} */}
                
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
                        {/*Logic for showing all samples with scroll bar */}
                        <ul>
                            <li>Sample 1</li>
                            <li>Sample 2</li>
                            <li>Sample 3</li>
                            <li>Sample 4</li>
                            <li>Sample 5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}