import { Application } from 'express';
import { agent } from 'supertest';

export function createRequest(app: Application) {
  const requestAgent = agent(app);
  return requestAgent;
}