import UserService from '@/api/services/user.service';
import '@/App.css';

function App() {
  const cb = () => {
    UserService.getUsers();
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-3xl">
        Whereas disregard and contempt for human rights have resulted
      </span>
      <button className="cursor-pointer" onClick={cb}>
        add od
      </button>
    </div>
  );
}

export default App;
