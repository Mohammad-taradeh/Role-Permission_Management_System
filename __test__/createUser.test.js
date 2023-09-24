import { after, it } from 'node:test';
import '../config'
import dataSource, { initDB } from '../dist/db/dataSource.js';
import User from '../db/entities/User'

beforeAll(async () => {
    await initDB();
});

afterAll(async() => {
    await dataSource.destroy();
});

const tmpData = {
    "username": "mohammad",
    "email": "moha@gmail.com",
    "password": "123456"
  };

describe('Test the user model', () => {
   
});