import Register from '@pages/Register';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Home from '@pages/Home';
import { AuthProvider } from '@context/auth';
import Navbar from '@components/Navbar';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <div>
              <Navbar />
              <div className="grid grid-cols-1 items-center min-h-screen bg-blue-50 md:grid-cols-8">
                <div className="col-auto md:col-span-4 md:col-start-3">
                  <Route path="/" exact component={Home} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </div>
              </div>
            </div>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
