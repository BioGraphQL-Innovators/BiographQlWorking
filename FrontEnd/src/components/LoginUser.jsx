import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import AuthContext from '../AuthContext';
import { LOGIN_USER } from '../graphqls/mutations';

const LoginUser = (props) => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const { onLogout } = props;

  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = { email, password };
    try {
      setError(null);
      const { data } = await loginUser({ variables: { input } });

      if (data.loginUser) {
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('role', data.loginUser.user.role);
        setIsLoggedIn(true);
        setUserRole(data.loginUser.user.role);

        if (typeof onLogout === 'function') {
          onLogout();
        }

        if (data.loginUser.user.role === 'PATIENT') {
          history.push('/patientview');
        } else {
          history.push('/patientdata');
        }
      }
    } catch (error) {
      console.log('Error logging in user', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  LoginUser.propTypes = {
    onLogout: PropTypes.func,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginUser;
