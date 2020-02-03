'use strict'

import Methods from './interfaces/Methods';
import Request from './interfaces/Request';

/**
 * chain-xhr provides an easy to use promise bbased chainable API that makes it simple to create any kind of XHR request.
 */
module.exports = class ChainXHR {
  /** * A constant that can be used to select the requested http request method from.  * 
   * Even if a request method is provided by hand, it will be double checked against the ones defined here to make sure that it
   * is a valid request method.
   * 
   * @property {Object}
   */
  METHODS: Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  };

  /**
   * A reference to the request object that will be used to build and send the final request.
   * 
   * @private
   * 
   * @property {Request}
   */
  private _request: Request = {
    method: this.METHODS.GET,
    withCredentials: false,
    contentType: 'application/json',
    queryParams: [],
    responseType: 'text'
  };

  /**
   * A reference to the actual XMLHttpRequest.
   * 
   * @private
   * 
   * @property {XMLHttpRequest}
   */
  private _XHR!: XMLHttpRequest;

  /**
   * Set the URL that this request should be sent to.
   * 
   * This request can fail if an invalid url is provided so it is recommended to wrap it in a try..catch if you believe there is any
   * chance of that happening.
   * 
   * @param {string} url The url to send this request to.
   * 
   * @returns {ChainXHR} Returns this for chaining.
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * request
   *  .url('https://example.com');
   */
  url(url: string): ChainXHR {
    this._request.url = new URL(url);

    return this;
  }

  /**
   * Sets the http request method to be used by this XHR request.
   * 
   * By default this property is set to 'GET'.
   * 
   * You can choose to type in a string directly such as 'GET' or 'get' or you can use the REQUEST constant of ChainXHR to set this.
   * 
   * @param {string} method The http request method to use for this XHR request.
   * 
   * @returns {ChainXHR} Returns this for chaining.
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * // Using a string directly:
   * request
   *  .url('https://example.com')
   *  .method('GET');
   * 
   * // Using the constant:
   * request
   *  .url('https://example.com');
   *  .method(request.METHOD.GET);
   */
  method(method: string): ChainXHR {
    const methodNormalized = method.toUpperCase();

    if (!this.METHODS.hasOwnProperty(methodNormalized)) throw new Error('An unsupported http request method was chosen');

    this._request.method = methodNormalized;

    return this;
  }

  /**
   * Sets this request to be made with credentials such as cookies, authorization headers, or TLS certificates.
   * 
   * By default this property is set to false.
   * 
   * This has no effect on same-site requests.
   * 
   * @returns {ChainXHR} Returns this for chaining.
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * request
   *  .withCredentials();
   */
  withCredentials(): ChainXHR {
    this._request.withCredentials = true;

    return this;
  }

  /**
   * Sets the content type header which indicates what type of content is being send to the endpoint.
   * 
   * By default this is set to 'application/json'.
   * 
   * @param {string} contentType The type of content that is being sent to the server.
   * 
   * @returns {ChainXHR}
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * request
   *  .contentType('x-www-formdata');
   */
  contentType(contentType: string): ChainXHR {
    this._request.contentType = contentType;

    return this;
  }

  /**
   * Adds a query parameter to send with the request.
   * 
   * This should be chained multiple times to add multiple query parameters.
   * 
   * @param {string} key The key of the query parameter to add.
   * @param {string|number|boolean} value The value of the key added.
   * 
   * @returns {ChainXHR}
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * request
   *  .queryParam('hello', 'world')
   *  .queryParam('count', 5);
   */
  queryParam(key: string, value: (string | number | boolean)): ChainXHR {
    const valueNormalized: string = value.toString();

    this._request.queryParams.push({ key: key, value: valueNormalized });

    return this;
  }

  /**
   * Sets the data to send through with the request.
   * 
   * @param {*} data The data to send through with the request.
   * 
   * @returns {ChainXHR}
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * // Sending an object.
   * const obj = { hello: 'world', year: 2019 };
   * 
   * request
   *  .data(obj);
   * 
   * // Sending key value pairs individually.
   * request
   *  .data('hello', 'world')
   *  .data('year', 2019);
   */
  data(data: (Object | string)): ChainXHR {
    if (typeof data === 'object' && ((data instanceof FormData) === false)) data = JSON.stringify(data);

    this._request.data = data;

    return this;
  }

  /**
   * Specifies that the data returned should be JSON parsed.
   * 
   * @returns {ChainXHR}
   */
  json(): ChainXHR {
    this._request.responseType = 'json';

    return this;
  }

  /**
   * Aborts the request if it already has been sent.
   * 
   * When a request is aborted, its readystate is changed to 0 and the status code is set to 0 also.
   * 
   * @returns {ChainXHR}
   */
  abort(): ChainXHR {
    this._XHR.abort();

    return this;
  }

  /**
   * Indicates that the XHR request is finished being built and is ready to be sent.
   * 
   * This should always be the final method used in all requests.
   * 
   * @async
   * 
   * @returns {Promise<any>}
   * 
   * @example
   * 
   * const request = new ChainXHR();
   * 
   * request
   *  .url('https://example.com')
   *  .method('GET')
   *  .send();
   */
  async send(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._request.queryParams.map(queryParam => this._request.url!.searchParams.append(queryParam.key, queryParam.value));

      this._XHR = new XMLHttpRequest();

      this._XHR.addEventListener('readystatechange', () => {
        if (this._XHR.readyState === 4 && this._XHR.status >= 200) resolve(this._XHR.response);
        else if (this._XHR.status >= 400 && this._XHR.status <= 600) reject();
      });

      this._XHR.addEventListener('error', (err: Event) => reject(err));

      this._XHR.open(this._request.method, this._request.url!.href, true);

      this._XHR.responseType = <XMLHttpRequestResponseType>this._request.responseType;

      this._XHR.withCredentials = this._request.withCredentials;

      this._XHR.setRequestHeader('Content-Type', this._request.contentType);

      this._XHR.send(this._request.data!);
    });
  }
};
