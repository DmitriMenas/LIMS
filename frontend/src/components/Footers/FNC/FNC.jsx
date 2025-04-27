import { NavLink } from 'react-router-dom'
import './FNC.css'

export default function FNC(){
    return (
        <div className='fnc-main'>
            <div className='fnc-left'>
                <div className='footer-logo'>
                    <img src='../../../images/chemhistory-logo-hexagon.png' />
                </div>
            </div>
            <div className='fnc-middle-left'>
                <div className='fnc-contact-us'>
                    <h2>Contact Us</h2>
                    <ul>
                        <li>
                            Phone: (503) 305-5252
                        </li>
                        <li>
                            Email: info@chemhistory.com
                        </li>
                        <li>
                            Visit Us: 5691 SE International Way Ste. A Milwaukie, OR 97222
                        </li>
                    </ul>
                </div>
            </div>
            <div className='fnc-middle-right'>
                <div className='methods'>
                    <h2>Instruments & Methods</h2>
                    <ul>
                        <li>
                            AGILENT 1290
                        </li>
                        <li>
                            AGILENT 6470
                        </li>
                        <li>
                            AGILENT 7890 A GCFID
                        </li>
                        <li>
                            AOAC OFFICIAL METHOD 997-02
                        </li>
                    </ul>
                </div>
            </div>
            <div className='fnc-right'>
                <div className='certifications'>
                    <h2>Certifications</h2>
                    <div className='certitifaction-logos'>
                        <NavLink className='certification-logo' to='https://www.oregon.gov/oha/Pages/PageNotFoundError.aspx?requestUrl=https://www.oregon.gov/oha/pages/404.aspx'>
                            <img src='../../../images/orelap.png'/>
                        </NavLink>
                        <NavLink className='certification-logo' to='https://www.oregon.gov/oha/Pages/PageNotFoundError.aspx?requestUrl=https://www.oregon.gov/oha/pages/404.aspx'>
                            <img src='../../../images/NELAP.png'/>
                        </NavLink>
                        <NavLink className='certification-logo' to='https://www.oregon.gov/oha/Pages/PageNotFoundError.aspx?requestUrl=https://www.oregon.gov/oha/pages/404.aspx'>
                            <img src='../../../images/olcc.png'/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}