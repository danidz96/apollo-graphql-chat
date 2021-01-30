import Register from '@pages/Register';

function App() {
  return (
    <div className="grid grid-cols-1 items-center min-h-screen bg-blue-50 md:grid-cols-8">
      <div className="col-auto md:col-span-4 md:col-start-3">
        <Register />
      </div>
    </div>
  );
}

export default App;
