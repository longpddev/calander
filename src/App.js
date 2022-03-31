import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar'
import moment from 'moment'
function App() {
  return (
    <div className="w-full h-full flex justify-center items-center min-h-[100vh]">
      <div>
        <Calendar
          timeDefault={moment()}
        />
      </div>
    </div>
  );
}

export default App;
