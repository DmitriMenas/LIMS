import './LPE.css'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchOrders } from '../../../store/orders'
import { useEffect, useState } from 'react'

export default function LPE({user}){
    const orders = useSelector(state => state?.orders.orders)
    const [filterStatus, setFilterStatus] = useState(null); // default status


    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchOrders())
    }, [dispatch])


    return (
        <div className='lpe-main'>
            {/* <NavEmployee user={user}/> */}
            <div className='lpe-body'>
                {/* use the following to create employees later 
                */}
                {/* {user?.role === 'admin' && (
                    <NavLink to='/signup'>SignUp</NavLink>
                )} */}
                
                <div className='lpe-samples-section'>
                    <div className='lpe-samples-section-header'>
                        <NavLink className='section-header-button-1' to='/samples/placed'>Placed</NavLink>
                        <NavLink className='section-header-button-2' to='/samples/in-progress'>In Progress</NavLink>
                        <NavLink className='section-header-button-3' to='/samples/completed'>Completed</NavLink>
                    </div>
                    <div className='lpe-samples-list'>
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
                <div className='lpc-orders-section'>
                    <div className='lpc-orders-section-header'>
                        <button className='section-header-button-1' onClick={() => setFilterStatus(null)}>All</button>
                        <button className='section-header-button-1' onClick={() => setFilterStatus('placed')}>Placed</button>
                        <button className='section-header-button-2' onClick={() => setFilterStatus('in_progress')}>In Progress</button>
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
                <div className='calender' 
                    style={{filter: 'invert(1) hue-rotate(180deg)'}}
                >
                    <iframe 
                        src="https://calendar.google.com/calendar/embed?src=dmitri%40chemhistory.com&ctz=America%2FLos_Angeles"
                        style={{ border: 0, width: '171vh', height: '96vh' }}
                        frameBorder="0" scrolling="no">

                    </iframe>
                </div>
            </div>
        </div>
        
    )
}