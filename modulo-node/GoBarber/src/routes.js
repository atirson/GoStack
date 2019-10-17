import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Atirson Fabiano',
    email: 'fabiano@gmail.com',
    password_hash: '345325',
  });

  return res.json(user);
});

export default routes;
