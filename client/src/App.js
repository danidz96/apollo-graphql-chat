import Register from '@pages/Register';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Home from '@pages/Home';
import { AuthProvider } from '@context/auth';
import Navbar from '@components/Navbar';
import DynamicRoute from '@components/DynamicRoute';

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
                  <DynamicRoute path="/" exact component={Home} authenticated />
                  <DynamicRoute path="/register" component={Register} guest />
                  <DynamicRoute path="/login" component={Login} guest />
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
