import React from 'react';
import ReactDOM from 'react-dom';
import {AuthUser} from "./common";


it('Auth User Expired when no token', () => {
  let user = new AuthUser(null, null);
  expect(user.isValid).toBeFalsy()
});

it('Auth User Not Expired with valid token', () =>{
  const token = {expires_in: 1800};
  const user = new AuthUser(token, null);
  expect(user.isValid).toBeTruthy()
});

describe('fast forward current date', () =>{
  const RealDate = Date;
  const ExpiredDate = new Date(new Date().setSeconds(new Date().getSeconds() + 1801));
  const MocDate = class MDate {
      constructor(...theArgs) {
          return ExpiredDate;
      }
  };
  const token = {expires_in: 1800};
  const user = new AuthUser(token, null);
  afterEach(() => {
    global.Date = RealDate;
  });
  it('Auth User Invalid ofter token expires', () => {
    global.Date = MocDate;
      expect(user.isValid).toBeFalsy();
  })
});