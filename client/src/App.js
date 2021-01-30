import Register from '@pages/Register';
import ApolloProvider from './ApolloProvider';

function App() {
  return (
    <ApolloProvider>
      <div className="grid grid-cols-1 items-center min-h-screen bg-blue-50 md:grid-cols-8">
        <div className="col-auto md:col-span-4 md:col-start-3">
          <Register />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
