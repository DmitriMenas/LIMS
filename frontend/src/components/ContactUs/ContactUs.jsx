import './ContactUs.css'
import FNC from '../Footers/FNC/FNC'

export default function ContactUs(){

    const handleContactSumbit = () => {
        alert('Feature coming soon')
    }

  return (
    <div className='contact-main'>
      <form onSubmit={handleContactSumbit} className='contact-form-container'>
        <div className='contact-header'>
          <h1>Contact Us</h1>
          <p>If you have any questions or inquiries, feel free to reach out using the form below.</p>
        </div>
        <div className='contact-form'>
            <label htmlFor="name">Name:</label><br />
            <input type="text" id="name" name="name" /><br />
        
            <label htmlFor="email">Email:</label><br />
            <input type="email" id="email" name="email" /><br />
        
            <label htmlFor="message">Message:</label><br />
            <textarea id="message" name="message" rows="5" /><br />
        </div>
        <div>
            <button type="submit" className='contact-send-button'>Send</button>
        </div>
      </form>
      <FNC />
    </div>
  );
}

