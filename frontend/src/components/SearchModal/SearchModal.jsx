import { useDispatch, useSelector } from 'react-redux';
import './SearchModal.css';
import { searchUserSamples } from '../../store/samples';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';

export default function SearchModal() {
    const filteredSamples = useSelector(state => state?.samples?.filteredSamples);
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleSearch = (e) => {
        const input = e.target.value;
        dispatch(searchUserSamples(input));
    };

    return (
        <div className='search-modal-main'>
            <div>
                <input
                    className='search-modal-search-bar'
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search by Sample Name, Type, ID, or Test Type..."
                />
            </div>
            
            {filteredSamples?.length > 0 ? (
                <div>
                    <ul className="search-results">
                    <div className='result-columns'>
                        <p>Sample Id:</p>
                        <p>Sample Name:</p>
                        <p>Sample Type:</p>
                        <p>Test Type:</p>
                        <p>Order ID:</p>
                        <p>Sample Status:</p>
                    </div>
                        {filteredSamples.map(sample => (
                            <div key={sample.id} className='search-result-single'>
                                <NavLink to={`/samples/${sample.id}`} onClick={closeModal} className='result-sample-id'>{sample.id}</NavLink>
                                <p className='result-name'>{sample.sample_name}</p>
                                <p className='result-sample-type'>{sample.sample_type}</p>
                                <p className='result-test-type'>{sample.test_type}</p>
                                <NavLink to={`/orders/${sample.orderId}`} onClick={closeModal} className='result-order-id'>{sample.orderId}</NavLink>
                                <p className='result-status'>{sample.status}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='search-modal-nav-links'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/settings'}>Settings</NavLink>
                </div>
            )}
        </div>
    );
}
