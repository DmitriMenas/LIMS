import './UpdateOrderModal'
import { useDispatch } from 'react-redux';
import { updateUserOrder } from '../../../store/orders';
import { deleteASample } from '../../../store/samples';

export default function UpdateOrderModal({ order, samples }){
    const dispatch = useDispatch();
    const num_of_samples = samples?.length

    const handleDeleteSample = (orderId, sampleId) => {
        if(num_of_samples === 1){
            alert('Cannot have an order with 0 samples. Please delete the order instead.')
            return
        } else {
            dispatch(deleteASample(sampleId))
            dispatch(updateUserOrder(orderId, { number_of_samples: num_of_samples - 1 })).then(()=> {
                window.location.href = `/orders/${orderId}`
            })
        }

    }

    const handleAddSample = () => {
        alert("Feature coming soon.")
    }



    return(
       <div className='update-order-modal-main'>
        

            {samples.map((sample) => (
                sample.status === 'placed' ? (
                    <div key={sample.id} className='order-details-sample-card'>
                        <p>Sample ID: {sample.id}</p>
                        <p>Sample Name: {sample.sample_name}</p>
                        <p>Sample Type: {sample.sample_type}</p>
                        <p>Test Type: {sample.test_type}</p>
                        <p>Sample Status: {sample.status}</p>
                        <p>Last Updated: {sample.updatedAt}</p>
                        <button onClick={() => handleDeleteSample(order.id, sample.id)}>Remove Sample</button>
                    </div>
                ) : (
                    <div key={sample.id} className='order-details-sample-card'>
                        <p>Sample ID: {sample.id}</p>
                        <p>Sample Name: {sample.sample_name}</p>
                        <p>Sample Type: {sample.sample_type}</p>
                        <p>Test Type: {sample.test_type}</p>
                        <p>Sample Status: {sample.status}</p>
                        <p>Last Updated: {sample.updatedAt}</p>
                    </div>
                )
            ))}
            {order.status === 'placed' && (
                <div>
                    <button onClick={handleAddSample}>Add Another Sample</button>
                    
                </div>
            )}
          
       </div>
    )
}