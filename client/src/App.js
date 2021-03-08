import Register from '@pages/Register';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Home from '@pages/home/Home';
import { AuthProvider } from '@context/auth';
import { MessageProvider } from '@context/message';
import Navbar from '@components/Navbar';
import DynamicRoute from '@components/DynamicRoute';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Switch>
              <>
                <div className="min-h-screen">
                  <Navbar />
                  <div
                    className="grid grid-cols-1 items-center bg-blue-500 md:grid-cols-8"
                    style={{ height: 'calc(100vh - 3rem)' }}
                  >
                    <div className="col-auto md:col-span-6 md:col-start-2">
                      <DynamicRoute path="/" exact component={Home} authenticated />
                      <DynamicRoute path="/register" component={Register} guest />
                      <DynamicRoute path="/login" component={Login} guest />
                    </div>
                  </div>
                </div>
              </>
            </Switch>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
