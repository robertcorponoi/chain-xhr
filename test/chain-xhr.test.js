'use strict'

import test from 'ava';
import ChainXHR from '../chain-xhr';

test('Sending a GET request and returning JSON', async t => {

  const request = new ChainXHR();

  const res = await request
    .method(request.METHODS.GET)
    .url('https://jsonplaceholder.typicode.com/todos/1')
    .json()
    .send();

  const expected = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  };

  t.deepEqual(res, expected);

});

test('Sending a GET request with a query parameter', async t => {

  const request = new ChainXHR();

  const res = await request
    .method(request.METHODS.GET)
    .url('https://jsonplaceholder.typicode.com/posts')
    .queryParam('userId', 1)
    .json()
    .send();

  t.is(res.length, 10);

});

test('Sending a POST request with JSON data', async t => {

  const request = new ChainXHR();

  const res = await request
    .method(request.METHODS.POST)
    .url('https://jsonplaceholder.typicode.com/posts')
    .data({
      title: 'foo',
      body: 'bar',
      userId: 1
    })
    .json()
    .send()
    .catch(err => { throw new Error(err) });

  const expected = {
    title: 'foo',
    body: 'bar',
    userId: 1,
    id: 101
  };

  t.deepEqual(res, expected);

});

test('Sending a POST request with form data', async t => {

  const request = new ChainXHR();

  const formData = new FormData();

  formData.append('title', 'foo');
  formData.append('body', 'bar');
  formData.append('userId', 1);

  const res = await request
    .method(request.METHODS.POST)
    .url('https://jsonplaceholder.typicode.com/posts')
    .contentType('multipart/form-data')
    .data(formData)
    .json()
    .send()
    .catch(err => { throw new Error(err) });

  const expected = {
    id: 101
  };

  t.deepEqual(res, expected);

});