import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure().connect({ host: '10.0.0.135' });

  tron.clear();

  console.tron = tron;
}
