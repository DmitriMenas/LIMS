import './ServicesPage.css'
import FNC from '../Footers/FNC/FNC'
import { NavLink } from 'react-router-dom'

export default function ServicesPage(){
    return (
        <div className='services-page-main'>
            <div className='services-container'>
                <div className='services-header'>
                    <h1>Cannabis Laboratory Services</h1>
                    <p>
                        We offer a comprehensive suite of testing services to ensure the safety, purity, and potency of cannabis products. Our certified laboratory provides reliable and timely results for all your compliance and research needs.
                    </p>
                </div>
                <div className='servies-information-container'>
                    <div>
                        <ul>
                            <li>Botanical Profiling</li>
                            <li>Residual Solvent Testing</li>
                            <li>Pesticide Screening</li>
                            <li>Heavy Metals Testing</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Terpene Profiling</li>
                            <li>Microbiological Testing</li>
                            <li>Potency Testing</li>
                        </ul>
                    </div>
                </div>
                <div className='request-button-container'>
                    <NavLink to="/contact" className='request-consult-button'>Request a Consultation</NavLink>
                </div>
            </div>
            <FNC />
        </div>
    )
}