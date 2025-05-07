import { useDispatch, useSelector } from 'react-redux';
import './SearchModal.css';
import { searchUserSamples } from '../../store/samples';
import { NavLink } from 'react-router-dom';

export default function SearchModal() {
    const filteredSamples = useSelector(state => state?.samples?.filteredSamples);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const input = e.target.value;
        dispatch(searchUserSamples(input));
    };

    return (
        <div className='search-modal-main'>
            <div className='search-modal-search-bar'>
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search samples..."
                />
            </div>
            {filteredSamples?.length > 0 ? (
                <ul className="search-results">
                    {filteredSamples.map(sample => (
                        <div key={sample.id}>
                            <p>{sample.id}</p>
                            <p>{sample.sample_name}</p>
                            <p>{sample.sample_type}</p>
                            <p>{sample.test_type}</p>
                            <p>{sample.orderId}</p>
                            <p>{sample.status}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <div className='search-modal-nav-links'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/settings'}>Settings</NavLink>
                </div>
            )}
        </div>
    );
}
