import './VerificationModal.css'

const VerificationModal = ({ sampleInputs, setIsVerifying, handleSubmit }) => {
    return (
      <div className='verification-modal'>
        <h2>Review Your Orders</h2>
        <div className='verifying-order-section'>
          {sampleInputs.map((samples, i) => (
            <div key={i} className='individual-order-verification'>
              <h3>Order {i + 1}</h3>
              <p>{samples.length} Sample(s) - Total price {samples.length * 69}</p>
              <ul>
                {samples.map((sample, j) => (
                  <li key={j}>
                    <strong>Name:</strong> {sample.name || '(No name)'}
                    <br />
                    <strong>Sample Type:</strong> {sample.sample_type || '(No type selected)'}
                    <br />
                    <strong>Test Type:</strong> {sample.test_type || '(No Test Type selected)'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => setIsVerifying(false)}>Go Back</button>
          <button onClick={handleSubmit}>Submit All Orders</button>
        </div>
      </div>
    );
  };
  
  export default VerificationModal;
  