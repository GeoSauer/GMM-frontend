import request from 'superagent';

const agent = request.agent();

agent.set({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

agent.withCredentials();

export default agent;
