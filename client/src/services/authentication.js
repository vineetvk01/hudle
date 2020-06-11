import axios from 'axios';
import { baseUrl } from '../constants';

const auth_urls = {
  LOGIN_URL: `${baseUrl}/api/user/login`,
  USER_PROFILE_URL: `${baseUrl}/api/users/me`,
  LOGOUT_URL: `${baseUrl}/api/user/logout`,
  SIGNUP_URL: `${baseUrl}/api/user/signup`,
};

export const userAuthStatus = async () => {
  try {
    const response = await axios.get(auth_urls.USER_PROFILE_URL, {
      withCredentials: true,
    });
    const { session, user } = response.data;
    if (session === 'active') {
      return user;
    }
    throw new Error('Unable to fetch');
  } catch (error) {
    return false;
  }
};

export const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(auth_urls.LOGIN_URL, credentials, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    const data = (error.response && error.response.data) || { status: 'failure', error: 'Server Not Reachable', };
    return data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      auth_urls.LOGOUT_URL,
      {},
      {
        withCredentials: true,
      },
    );
    return Boolean(response.status === 200);
  } catch (error) {
    return false;
  }
};

export const signupUser = async ({
  firstName,
  lastName,
  email,
  password,
  gender,
  type,
  company,
  industry,
  website,
  jobProfile
}) => {
  try {
    const response = await axios.post(
      auth_urls.SIGNUP_URL,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        gender,
        type,
        company_name: company,
        industry,
        website,
        job_profile: jobProfile
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    const data = (error.response && error.response.data) || { status: 'failure', error: 'Server Not Reachable', };
    return data;
  }
};