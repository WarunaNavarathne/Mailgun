import './App.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent from refreshing the page
    if(!email || !subject || !message){
      return toast.error('Please fill email,subject and message');
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/api/email', {
        email,
        subject,
        message,
      });
      setLoading(false);
      toast.success(data.message);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      )
    }
  }
  
  return (
    <div className="App">
      <ToastContainer position='bottom-center' limit={1} />
      <header className="App-header">
        <form onSubmit={submitHandler}>
          <h1>Send Email</h1>
          <div>
            <label htmlFor='email'>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor='subject'>Subject</label>
            <input id='subject' type='text' onChange={(e) => setSubject(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor='message'>Subject</label>
            <input id='message' type='text' onChange={(e) => setMessage(e.target.value)}></input>
          </div>
          <div>
            <label></label>
            <button disabled={loading} type='submit'>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
