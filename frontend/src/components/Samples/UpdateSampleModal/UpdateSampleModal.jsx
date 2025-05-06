import { useState } from 'react';
import './UpdateSampleModal.css';
import { useDispatch } from 'react-redux';
import { updateUserSample } from '../../../store/samples';

export default function UpdateSampleModal({ order, sample }) {
  const [sampleName, setSampleName] = useState(sample.name || '');
  const [sampleType, setSampleType] = useState(sample.type || '');
  const [testType, setTestType] = useState(sample.testType || '');
  const dispatch = useDispatch()

  const handleSampleUpdate = () => {
    const updatedSample = {
      sample_name: sampleName,
      sample_type: sampleType,
      test_type: testType
    };
    dispatch(updateUserSample(sample.id, updatedSample)).then(()=>{
        window.location.href = `/samples/${sample.id}`
    })
  };

  return (
    <div>
      <h1>Update Sample {sample.id}</h1>
      <input
        type='text'
        placeholder='Sample Name'
        value={sampleName}
        onChange={(e) => setSampleName(e.target.value)}
      />
      <select
        value={sampleType}
        onChange={(e) => setSampleType(e.target.value)}
      >
        <option value="" disabled>Select Sample Type</option>
        <option value="Flower">Flower</option>
        <option value="Concentrate">Concentrate</option>
        <option value="Injestible">Injestible</option>
      </select>
      <select
        value={testType}
        onChange={(e) => setTestType(e.target.value)}
      >
        <option value="" disabled>Select Test Type</option>
        <option value="R&D">R&D</option>
        <option value="Full Compliance">Full Compliance</option>
      </select>
      <button onClick={handleSampleUpdate}>Update</button>
    </div>
  );
}
