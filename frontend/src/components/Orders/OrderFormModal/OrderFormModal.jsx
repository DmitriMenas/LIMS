import { useState } from 'react';
import OrderModal from '../OrderModal/OrderModal';
import SampleModal from '../../Samples/SampleModal/SampleModal';
import VerificationModal from '../../VerificationModal/VerificationModal';
import './OrderFormModal.css'
import {useDispatch} from 'react-redux'
import { createOrder } from '../../../store/orders';

const OrderFormModal = () => {
  const [numOrders, setNumOrders] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [samplesPerOrder, setSamplesPerOrder] = useState([]);
  const [sampleInputs, setSampleInputs] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentRangeLabel, setCurrentRangeLabel] = useState(null);
  const dispatch = useDispatch(); // Access the Redux dispatch function

  const startOrderFlow = (e) => {
    const orderCount = parseInt(e.target.value);
    setNumOrders(orderCount);
    setCurrentOrder(0);
    setSamplesPerOrder(Array(orderCount).fill(0));
    setSampleInputs(Array(orderCount).fill([]));
  };

  const handleNextOrder = () => {
    if (currentOrder + 1 < numOrders) {
      setCurrentOrder(currentOrder + 1);
    }
  };

  const handleSampleRangeSelect = (min, max, label) => {
    const count = max; // Always use the maximum selected value
  
    const updatedSamplesPerOrder = [...samplesPerOrder];
    updatedSamplesPerOrder[currentOrder] = count;
  
    const updatedSampleInputs = [...sampleInputs];
    updatedSampleInputs[currentOrder] = Array.from({ length: count }, () => ({ name: '', type: '' }));
  
    setSamplesPerOrder(updatedSamplesPerOrder);
    setSampleInputs(updatedSampleInputs);
    setCurrentRangeLabel(label);
  };

  const handleSampleInputChange = (index, field, value) => {
    const updatedInputs = [...sampleInputs];
    updatedInputs[currentOrder][index] = {
      ...updatedInputs[currentOrder][index],
      [field]: value,
    };
    setSampleInputs(updatedInputs);
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Gather order data for each sample
      const orderDataArray = sampleInputs.map((samples, index) => ({
        number_of_samples: samples.length, // Set this to the actual number of samples in the current order
        samples: samples.map(sample => ({
          name: sample.name,
          sample_type: sample.sample_type,
          test_type: sample.test_type,
        })),
      }));
      console.log(`Sample Inputs: ${sampleInputs} `)
      console.log(`Order Data Array: ${orderDataArray.samples}`);  // This will log an array of objects, each containing the details of all samples for an order
    
      // Step 2: Dispatch the action to create each order
      for (const orderData of orderDataArray) {
        const createdOrder = await dispatch(createOrder(orderData));
        if (createdOrder) {
          console.log('Order created successfully:', createdOrder);
        } else {
          console.log('There was an error creating an order.');
        }
      }

      //step 3: dispatch the action to create each sample
      // const sampleDataArray = sampleInputs
      // for() {
      //   const createdSample = await dispatch(createSample, createdSample)
      //   if(createdSample) {
      //     console.log('Samples created succesffuly:', createdSample)
      //   }
      // }
    
      window.location.href = '/';
    } catch (error) {
      // Error handling
      console.error('Error creating orders:', error);
      alert('There was an error creating your orders. Please try again.');
    }
  };
  
  

  return (
    <div className='order-form-modal'>
      {isVerifying ? (
        <VerificationModal sampleInputs={sampleInputs} setIsVerifying={setIsVerifying} handleSubmit={handleSubmit} />
      ) : numOrders === 0 ? (
        <OrderModal startOrderFlow={startOrderFlow} />
      ) : samplesPerOrder[currentOrder] === 0 ? (
        <SampleModal
          currentOrder={currentOrder}
          handleSampleRangeSelect={handleSampleRangeSelect}
        />
      ) : (
        <SampleModal
          currentOrder={currentOrder}
          sampleInputs={sampleInputs}
          handleSampleInputChange={handleSampleInputChange}
          handleNextOrder={handleNextOrder}
          setIsVerifying={setIsVerifying}
          currentRangeLabel={currentRangeLabel}
        />
      )}
    </div>
  );
};

export default OrderFormModal;