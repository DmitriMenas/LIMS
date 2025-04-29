import { useState } from 'react';
import OrderModal from '../OrderModal/OrderModal';
import SampleModal from '../../Samples/SampleModal/SampleModal';
import VerificationModal from '../../VerificationModal/VerificationModal';
import './OrderFormModal.css'
import {useDispatch} from 'react-redux'
import { createOrder } from '../../../store/orders';
import { createSample } from '../../../store/samples';

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
    console.log("Current Order Before Increment:", currentOrder);
  };

  const handleSampleRangeSelect = (min, max, label) => {
    console.log(min, max, label)
    const count = max; // Always use the maximum selected value
  
    const updatedSamplesPerOrder = [...samplesPerOrder];
    updatedSamplesPerOrder[currentOrder] = count;
  
    const updatedSampleInputs = [...sampleInputs];
    updatedSampleInputs[currentOrder] = Array.from({ length: count }, () => ({ sample_name: '', sample_type: '', test_type: '' }));
  
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
      const orderDataArray = sampleInputs.map((samples) => ({
        number_of_samples: samples.length,
        samples: samples.map(sample => ({
          sample_name: sample.sample_name,
          sample_type: sample.sample_type,
          test_type: sample.test_type,
        })),
      }));
  
      for (const orderData of orderDataArray) {
        const createdOrder = await dispatch(createOrder(orderData));
  
        if (createdOrder) {
          console.log('Order created successfully:', createdOrder);
  
          const samplesForThisOrder = orderData.samples;
          
          for (const sample of samplesForThisOrder) {
            const sampleData = {
              sample_name: sample.sample_name,
              sample_type: sample.sample_type,
              test_type: sample.test_type,
              orderId: createdOrder.id
            };
  
            await dispatch(createSample(sampleData));
          }
        } else {
          console.log('There was an error creating an order.');
        }
      }
  
      // Optionally: redirect or close modals here
      window.location.href = '/';
      
    } catch (error) {
      console.error('Error creating orders and samples:', error);
      alert('There was an error. Please try again.');
    }
  };

  console.log("Sample Inputs for Current Order:", sampleInputs[currentOrder]);


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
          handleSampleRangeSelect={handleSampleRangeSelect}
          setIsVerifying={setIsVerifying}
          currentRangeLabel={currentRangeLabel}
        />
      )}
    </div>
  );
};

export default OrderFormModal;