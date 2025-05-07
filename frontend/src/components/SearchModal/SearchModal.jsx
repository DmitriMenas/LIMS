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
                            <li>{sample.id}</li>
                            <li>{sample.sample_name}</li>
                            <li>{sample.sample_type}</li>
                            <li>{sample.test_type}</li>
                            <li>{sample.orderId}</li>
                            <li>{sample.status}</li>
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
