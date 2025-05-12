import './LPNC.css'
import { useState, useEffect } from 'react'
import LPNCCard1 from './LPNCCards/LPNCCard1/LPNCCard1'
import LPNCCard2 from './LPNCCards/LPNCCard2/LPNCCard2'
import FNC from '../../Footers/FNC/FNC'
import { NavLink } from 'react-router-dom'


export default function LPNC(){
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === 0 ? 1 : 0))
        }, 12500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='lpnc-main'>
            
            <div className='lpnc-body'>
                <div className='lpnc-body-background'></div>
                <div className='lpnc-body-slider'>
                    <div className={`lpnc-body-sec1 ${activeSlide === 0 ? 'show' : 'hide'}`}>
                        <LPNCCard1 />
                    </div>
                    <div className={`lpnc-body-sec2 ${activeSlide === 1 ? 'show' : 'hide'}`}>
                        <LPNCCard2 />
                    </div>
                    {/* Slide indicators */}
                    <div className="slide-indicators">
                        {[0, 1].map((index) => (
                            <span
                                key={index}
                                className={`dot ${activeSlide === index ? 'active' : ''}`}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className='lpnc-body-sec3'>
                        <div>
                            <img src="/images/lpnc-body-sec3-img.jpg" className='lpnc-body-sec3-img'/>
                        </div>
                        <div className='lpnc-body-sec3-text'>
                            <h2>Welcome to ChemHistory</h2>
                            <h1>Accurate, precise, and consistent quality control & analytical testing.</h1>
                            <p>ChemHistory is Oregon’s premier laboratory providing comprehensive quality control/quality assurance (QA/QC), ensuring safety and regulatory compliance.</p>
                            <p>Our laboratory meets and exceeds all requirements through analytical testing methodologies, state-of-the-art instrumentation, and highly trained scientific personnel.</p>
                            <div className='lpnc-signup-button-container'>
                                <NavLink to='/signup' className='lpnc-signup-button'>Create an Account</NavLink>
                            </div>
                        </div>
                </div>
                <div className='lpnc-body-sec4'>
                        <div className='lpnc-body-sec4-text'>
                            <h2>Our Services</h2>
                            <h1>ChemHistory Service Expertise Include:</h1>
                            <p>ChemHistory can provide you with the documentation necessary to prove your product is safe and meets your expectations, as well as those of your clients, by providing the highest quality analytical testing services.</p>
                            <div className='lpnc-body-sec4-list'>
                                <ul>
                                    <li>Botanical Profiling</li>
                                    <li>Residual Solvent Testing</li>
                                    <li>Pesticide Screening</li>
                                    <li>Heavy Metals Testing</li>
                                </ul>
                                <ul>
                                    <li>Terpene Profiling</li>
                                    <li>Microbiological Testing</li>
                                    <li>Potency Testing</li>
                                </ul>
                            </div>
                            <div className='lpnc-service-button-container'>
                                <NavLink to='/services' className='services-button'>Our Services</NavLink>
                            </div>
                        </div>
                        <div>
                            <img src="/images/lpnc-body-sec3-img.jpg" className='lpnc-body-sec4-img'/>
                        </div>
                </div>
            </div>
            <FNC />
        </div>
    )
}