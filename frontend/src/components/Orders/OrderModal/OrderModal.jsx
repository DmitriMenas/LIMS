import './OrderModal.css'

const OrderModal = ({ startOrderFlow }) => {
    return (
      <div className='order-modal'>
        <label >How many orders do you have? (Max 4)</label>
        <div className='order-modal-selector'>
        {[1, 2, 3, 4].map((count) => (
          <button key={count} value={count} onClick={startOrderFlow} className='order-modal-buttons'>
            {count}
          </button>
        ))}
        </div>
      </div>
    );
  };
  
  export default OrderModal;
  