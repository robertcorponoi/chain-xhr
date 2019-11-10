<div align="center">

# chain-xhr

Chain XHR aims to make creating XHR requests as simple as possible through a chainable API.

**Note:** chain-xhr is not final yet and I plan on implementing more features including simplifying the process of sending different types of data such as form data.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/chain-xhr.svg?style=flat)](https://www.npmjs.com/package/chain-xhr)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/chain-xhr/badge.svg)](https://snyk.io/test/github/robertcorponoi/chain-xhr)
[![NPM downloads](https://img.shields.io/npm/dm/chain-xhr.svg?style=flat)](https://www.npmjs.com/package/chain-xhr)
<a href="https://badge.fury.io/js/chain-xhr"><img src="https://img.shields.io/github/issues/robertcorponoi/chain-xhr.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/chain-xhr"><img src="https://img.shields.io/github/license/robertcorponoi/chain-xhr.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Table of contents**

- [Install](#install)
- [Usage](#usage)
- [Properties](#properties)
- [API](#api)
- [Examples](#examples)
- [Tests](#tests)

## **Install**

To install chain-xhr, you can use

```shell
$ npm install chain-xhr
```

## **Usage**

To use chain-xhr in your application, simply import it as an ES6 module like so:

```js
// Webpack
import ChainXHR from 'chain-xhr';

// Browser
import ChainXHR from './path/to/chain-xhr.js';

const request = new ChainXHR();
```

## **Properties**

### **METHODS**

The methods property exposes the different http request types that can be used with ChainXHR. While these are not required to be used, they can be used instead of the string representations if you want to be safe.

```js
const requost = new ChainXHR();

console.log(request.METHODS.GET);     // 'GET'
console.log(request.METHODS.POST);    // 'POST'
console.log(request.METHODS.PUT);     // 'PUT'
console.log(request.METHODS.DELETE);  // 'DELETE'
```

## **API**

### **url**

Sets the URL that this request should be sent to.

| Param | Type   | Description                      | Default |
|-------|--------|----------------------------------|---------|
| url   | string | The url to send this request to. |         |

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/todos/1')
  .send();
```

### **method**

Sets the http request moethod to be used by this request.

This is set to 'GET' by default. When setting this, you can choose to type in a string directly such as 'GET' or 'get' or you can use the REQUEST constant of ChainXHR to set this.

| Param  | Type   | Description                                          | Default |
|--------|--------|------------------------------------------------------|---------|
| method | string | The http request method to use for this XHR request. |         |

Using the `METHODS` property:

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/todos/1')
  .method(request.METHODS.GET)
  .send();
```

Using a string:

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/todos/1')
  .method('GET')
  .send();
```

### **withCredentials**

Sets this request to be made with credentials such as cookies, authorization headers, or TLS certificates.

By default this is set to false and it also has no effect on same-site requests.

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/todos/1')
  .withCredentials()
  .send();
```

### **contentType**

Sets the content type header which indicates what type of content is being send to the endpoint.

By default this is set to 'application/json'.

| Param       | Type   | Description                                           | Default |
|-------------|--------|-------------------------------------------------------|---------|
| contentType | string | The type of content that is being sent to the server. |         |

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .contentType('multipart/form-data')
  .send();
```

### **queryParam**

Adds a query parameter to send with the request.

This should be chained multiple times to add multiple query parameters.

| Param | Type   | Description                            | Default |
|-------|--------|----------------------------------------|---------|
| key   | string | The key of the query parameter to add. |         |
| value | string | The value of the key added.            |         |

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .queryParam('hello', 'world')
  .queryParam('count', 5)
  .send()
```

### **data**

Sets the data to send through with the request.

| Param | Type | Description                               | Default |
|-------|------|-------------------------------------------|---------|
| data  | *    | The data to send through with the request |         |

Sending an Object:

```js
const request = new ChainXHR();

const obj = { hello: 'world', year: 2019 };

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .data(obj)
  .send()
```

Sending key value pairs individually:

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .data('hello', 'world')
  .data('year', 2019)
  .send()
```

### **json**

Specifies that the data returned should be JSON parsed.

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .json()
  .send()
```

### **send**

Indicates that the XHR request is finished being built and is ready to be sent.

This should always be the final method used in all requests.

```js
const request = new ChainXHR();

const res = await request
  .url('https://jsonplaceholder.typicode.com/posts')
  .send()
```

## **Examples**

Sending a GET request and returning JSON data:

```js
const request = new ChainXHR();

const res = await request
  .method(request.METHODS.GET)
  .url('https://jsonplaceholder.typicode.com/todos/1')
  .json()
  .send();
```

Sending a GET request with a query parameter:

```js
const request = new ChainXHR();

const res = await request
  .method(request.METHODS.GET)
  .url('https://jsonplaceholder.typicode.com/posts')
  .queryParam('userId', 1)
  .json()
  .send();
```

Sending a POST request with JSON data:

```js
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
```

Sending a POST request with form data:

```js
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
```

## **Tests**

To run all of the available tests use:

```bash
$ npm run test
```

## **License**

MIT