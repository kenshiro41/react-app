import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('token');
const user_name = cookies.get('user');
const nickname = cookies.get('nickname');

export { cookies, token, user_name, nickname };
