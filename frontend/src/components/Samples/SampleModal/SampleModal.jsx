import './SampleModal.css'

function SampleModal({
  currentOrder,
  sampleInputs,
  handleSampleInputChange,
  handleNextOrder,
  handleSampleRangeSelect,
  setIsVerifying,
  currentRangeLabel
}) {
  // If sampleInputs or the current order's input is not defined yet
  if (!sampleInputs || !sampleInputs[currentOrder]) {
    return (
      <div className='sample-range-modal'>
        <h3>How many samples in Order {currentOrder + 1}?</h3>
        <div className="sample-range-selector">
          {[{ label: '1–5', min: 1, max: 5 }, { label: '6–11', min: 6, max: 11 }, { label: '12–20', min: 12, max: 20 }].map(
            ({ label, min, max }) => (
              <button className='sample-range-buttons' key={label} onClick={() => handleSampleRangeSelect(min, max, label)}>
                {label}
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='sample-inputs-modal'>
      <h3>Enter names for {sampleInputs[currentOrder].length} samples in Order {currentOrder + 1}:</h3>
      <div
          className={`sample-inputs range-${currentRangeLabel?.replace('–', '-')}`}
        >
          {sampleInputs[currentOrder].map((value, index) => (
            <div key={index} className="sample-input-row">
              <input
                type="text"
                placeholder={`Sample ${index + 1} Name`}
                value={value.name}
                onChange={(e) => handleSampleInputChange(index, 'name', e.target.value)}
              />
              <select
                value={value.sample_type}
                onChange={(e) => handleSampleInputChange(index, 'sample_type', e.target.value)}
              >
                <option value="null">Select Sample Type</option>
                <option value="Flower">Flower</option>
                <option value="Concentrate">Concentrate</option>
                <option value="Injestible">Injestible</option>
              </select>
              <select
                value={value.test_type}
                onChange={(e) => handleSampleInputChange(index, 'test_type', e.target.value)}
              >
                <option value="">Select Test Type</option>
                <option value="R&D">R&D</option>
                <option value="Full Compliance">Full Compliance</option>
              </select>
            </div>
          ))}
        </div>
      {currentOrder + 1 < sampleInputs.length ? (
        <button className='next-order-button' onClick={handleNextOrder}>Next Order</button>
      ) : (
        <button className={`review-order-button range-${currentRangeLabel?.replace('–', '-')}`}onClick={() => setIsVerifying(true)}>Review Orders</button>
      )}
    </div>
  );
}

export default SampleModal;
