import './LPNCCard1.css'
export default function LPNCCards(){
    return (
        <div className='lpnc-cards-1'>
            <div className='lpnc-body-card1-slide1'>
                <h2>Expert Quality Control</h2>
                <p>State of the art instrumentation, highly trained scientific personnel, & proprietary developed methodologies provide exper quality control services.</p>
            </div>
            <div className='lpnc-body-card2-slide1'>
                <h2>Analytical Services</h2>
                <p>ChemHistory is a dedicated QA/QC Laboratory providing analytical screening services for farmers, product producers, distributors, and consumers that meet and exceed your expectations.</p>
            </div>
            <div className='lpnc-body-card3-slide1'>
                <h2>Opening Hours</h2>
                <div className='lpnc-body-card3-hours'>
                    <p>Monday - Friday</p>
                    <p>9:00 - 5:00</p>
                </div>
                <div className='lpnc-body-card3-hours'>
                    <p>Saturday</p>
                    <p>Closed</p>
                </div>
                <div className='lpnc-body-card3-hours'>
                    <p>Sunday</p>
                    <p>Closed</p>
                </div>
            </div>
        </div>
    )
}