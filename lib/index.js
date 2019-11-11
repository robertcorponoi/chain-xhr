'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _temp;

/**
 * chain-xhr provides an easy to use promise bbased chainable API that makes it simple to create any kind of XHR request.
 */
module.exports = (_temp =
/*#__PURE__*/
function () {
  function ChainXHR() {
    (0, _classCallCheck2["default"])(this, ChainXHR);
    (0, _defineProperty2["default"])(this, "METHODS", {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    });
    (0, _defineProperty2["default"])(this, "_request", {
      method: this.METHODS.GET,
      withCredentials: false,
      contentType: 'application/json',
      queryParams: [],
      responseType: 'text'
    });
    (0, _defineProperty2["default"])(this, "_XHR", void 0);
  }

  (0, _createClass2["default"])(ChainXHR, [{
    key: "url",

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
    value: function url(_url) {
      this._request.url = new URL(_url);
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

  }, {
    key: "method",
    value: function method(_method) {
      var methodNormalized = _method.toUpperCase();

      if (!this.METHODS[methodNormalized]) throw new Error('An unsupported http request method was chosen');
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

  }, {
    key: "withCredentials",
    value: function withCredentials() {
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

  }, {
    key: "contentType",
    value: function contentType(_contentType) {
      this._request.contentType = _contentType;
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

  }, {
    key: "queryParam",
    value: function queryParam(key, value) {
      var valueNormalized = value.toString();

      this._request.queryParams.push({
        key: key,
        value: valueNormalized
      });

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

  }, {
    key: "data",
    value: function data(_data) {
      if ((0, _typeof2["default"])(_data) === 'object' && _data instanceof FormData === false) _data = JSON.stringify(_data);
      this._request.data = _data;
      return this;
    }
    /**
     * Specifies that the data returned should be JSON parsed.
     * 
     * @returns {ChainXHR}
     */

  }, {
    key: "json",
    value: function json() {
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

  }, {
    key: "abort",
    value: function abort() {
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

  }, {
    key: "send",
    value: function send() {
      var _this = this;

      return _regenerator["default"].async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _this._request.queryParams.map(function (queryParam) {
                  return _this._request.url.searchParams.append(queryParam.key, queryParam.value);
                });

                _this._XHR = new XMLHttpRequest();

                _this._XHR.addEventListener('readystatechange', function () {
                  if (_this._XHR.readyState === 4 && _this._XHR.status >= 200) resolve(_this._XHR.response);else if (_this._XHR.status >= 400 && _this._XHR.status <= 600) reject();
                });

                _this._XHR.addEventListener('error', function (err) {
                  return reject(err);
                });

                _this._XHR.open(_this._request.method, _this._request.url.href, true);

                _this._XHR.responseType = _this._request.responseType;
                _this._XHR.withCredentials = _this._request.withCredentials;

                _this._XHR.setRequestHeader('Content-Type', _this._request.contentType);

                _this._XHR.send(_this._request.data);
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);
  return ChainXHR;
}(), _temp);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiR0VUIiwiUE9TVCIsIlBVVCIsIkRFTEVURSIsIm1ldGhvZCIsIk1FVEhPRFMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb250ZW50VHlwZSIsInF1ZXJ5UGFyYW1zIiwicmVzcG9uc2VUeXBlIiwidXJsIiwiX3JlcXVlc3QiLCJVUkwiLCJtZXRob2ROb3JtYWxpemVkIiwidG9VcHBlckNhc2UiLCJFcnJvciIsImtleSIsInZhbHVlIiwidmFsdWVOb3JtYWxpemVkIiwidG9TdHJpbmciLCJwdXNoIiwiZGF0YSIsIkZvcm1EYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIl9YSFIiLCJhYm9ydCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFwIiwicXVlcnlQYXJhbSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsImVyciIsIm9wZW4iLCJocmVmIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7OztBQUdBQSxNQUFNLENBQUNDLE9BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNEQVVxQjtBQUNqQkMsTUFBQUEsR0FBRyxFQUFFLEtBRFk7QUFFakJDLE1BQUFBLElBQUksRUFBRSxNQUZXO0FBR2pCQyxNQUFBQSxHQUFHLEVBQUUsS0FIWTtBQUlqQkMsTUFBQUEsTUFBTSxFQUFFO0FBSlMsS0FWckI7QUFBQSx1REF3QjhCO0FBQzFCQyxNQUFBQSxNQUFNLEVBQUUsS0FBS0MsT0FBTCxDQUFhTCxHQURLO0FBRTFCTSxNQUFBQSxlQUFlLEVBQUUsS0FGUztBQUcxQkMsTUFBQUEsV0FBVyxFQUFFLGtCQUhhO0FBSTFCQyxNQUFBQSxXQUFXLEVBQUUsRUFKYTtBQUsxQkMsTUFBQUEs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XHJcblxyXG5pbXBvcnQgTWV0aG9kcyBmcm9tICcuL2ludGVyZmFjZXMvTWV0aG9kcyc7XHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vaW50ZXJmYWNlcy9SZXF1ZXN0JztcclxuXHJcbi8qKlxyXG4gKiBjaGFpbi14aHIgcHJvdmlkZXMgYW4gZWFzeSB0byB1c2UgcHJvbWlzZSBiYmFzZWQgY2hhaW5hYmxlIEFQSSB0aGF0IG1ha2VzIGl0IHNpbXBsZSB0byBjcmVhdGUgYW55IGtpbmQgb2YgWEhSIHJlcXVlc3QuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENoYWluWEhSIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjb25zdGFudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlbGVjdCB0aGUgcmVxdWVzdGVkIGh0dHAgcmVxdWVzdCBtZXRob2QgZnJvbS5cclxuICAgKiBcclxuICAgKiBFdmVuIGlmIGEgcmVxdWVzdCBtZXRob2QgaXMgcHJvdmlkZWQgYnkgaGFuZCwgaXQgd2lsbCBiZSBkb3VibGUgY2hlY2tlZCBhZ2FpbnN0IHRoZSBvbmVzIGRlZmluZWQgaGVyZSB0byBtYWtlIHN1cmUgdGhhdCBpdFxyXG4gICAqIGlzIGEgdmFsaWQgcmVxdWVzdCBtZXRob2QuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICovXHJcbiAgTUVUSE9EUzogTWV0aG9kcyA9IHtcclxuICAgIEdFVDogJ0dFVCcsXHJcbiAgICBQT1NUOiAnUE9TVCcsXHJcbiAgICBQVVQ6ICdQVVQnLFxyXG4gICAgREVMRVRFOiAnREVMRVRFJ1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBidWlsZCBhbmQgc2VuZCB0aGUgZmluYWwgcmVxdWVzdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7UmVxdWVzdH1cclxuICAgKi9cclxuICBwcml2YXRlIF9yZXF1ZXN0OiBSZXF1ZXN0ID0ge1xyXG4gICAgbWV0aG9kOiB0aGlzLk1FVEhPRFMuR0VULFxyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICBxdWVyeVBhcmFtczogW10sXHJcbiAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgWE1MSHR0cFJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1hNTEh0dHBSZXF1ZXN0fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1hIUiE6IFhNTEh0dHBSZXF1ZXN0O1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIFVSTCB0aGF0IHRoaXMgcmVxdWVzdCBzaG91bGQgYmUgc2VudCB0by5cclxuICAgKiBcclxuICAgKiBUaGlzIHJlcXVlc3QgY2FuIGZhaWwgaWYgYW4gaW52YWxpZCB1cmwgaXMgcHJvdmlkZWQgc28gaXQgaXMgcmVjb21tZW5kZWQgdG8gd3JhcCBpdCBpbiBhIHRyeS4uY2F0Y2ggaWYgeW91IGJlbGlldmUgdGhlcmUgaXMgYW55XHJcbiAgICogY2hhbmNlIG9mIHRoYXQgaGFwcGVuaW5nLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCB0byBzZW5kIHRoaXMgcmVxdWVzdCB0by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Q2hhaW5YSFJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCByZXF1ZXN0ID0gbmV3IENoYWluWEhSKCk7XHJcbiAgICogXHJcbiAgICogcmVxdWVzdFxyXG4gICAqICAudXJsKCdodHRwczovL2V4YW1wbGUuY29tJyk7XHJcbiAgICovXHJcbiAgdXJsKHVybDogc3RyaW5nKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QudXJsID0gbmV3IFVSTCh1cmwpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGh0dHAgcmVxdWVzdCBtZXRob2QgdG8gYmUgdXNlZCBieSB0aGlzIFhIUiByZXF1ZXN0LlxyXG4gICAqIFxyXG4gICAqIEJ5IGRlZmF1bHQgdGhpcyBwcm9wZXJ0eSBpcyBzZXQgdG8gJ0dFVCcuXHJcbiAgICogXHJcbiAgICogWW91IGNhbiBjaG9vc2UgdG8gdHlwZSBpbiBhIHN0cmluZyBkaXJlY3RseSBzdWNoIGFzICdHRVQnIG9yICdnZXQnIG9yIHlvdSBjYW4gdXNlIHRoZSBSRVFVRVNUIGNvbnN0YW50IG9mIENoYWluWEhSIHRvIHNldCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgVGhlIGh0dHAgcmVxdWVzdCBtZXRob2QgdG8gdXNlIGZvciB0aGlzIFhIUiByZXF1ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiAvLyBVc2luZyBhIHN0cmluZyBkaXJlY3RseTpcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC51cmwoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKVxyXG4gICAqICAubWV0aG9kKCdHRVQnKTtcclxuICAgKiBcclxuICAgKiAvLyBVc2luZyB0aGUgY29uc3RhbnQ6XHJcbiAgICogcmVxdWVzdFxyXG4gICAqICAudXJsKCdodHRwczovL2V4YW1wbGUuY29tJyk7XHJcbiAgICogIC5tZXRob2QocmVxdWVzdC5NRVRIT0QuR0VUKTtcclxuICAgKi9cclxuICBtZXRob2QobWV0aG9kOiBzdHJpbmcpOiBDaGFpblhIUiB7XHJcblxyXG4gICAgY29uc3QgbWV0aG9kTm9ybWFsaXplZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgIGlmICghdGhpcy5NRVRIT0RTW21ldGhvZE5vcm1hbGl6ZWRdKSB0aHJvdyBuZXcgRXJyb3IoJ0FuIHVuc3VwcG9ydGVkIGh0dHAgcmVxdWVzdCBtZXRob2Qgd2FzIGNob3NlbicpO1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QubWV0aG9kID0gbWV0aG9kTm9ybWFsaXplZDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoaXMgcmVxdWVzdCB0byBiZSBtYWRlIHdpdGggY3JlZGVudGlhbHMgc3VjaCBhcyBjb29raWVzLCBhdXRob3JpemF0aW9uIGhlYWRlcnMsIG9yIFRMUyBjZXJ0aWZpY2F0ZXMuXHJcbiAgICogXHJcbiAgICogQnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzIHNldCB0byBmYWxzZS5cclxuICAgKiBcclxuICAgKiBUaGlzIGhhcyBubyBlZmZlY3Qgb24gc2FtZS1zaXRlIHJlcXVlc3RzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC53aXRoQ3JlZGVudGlhbHMoKTtcclxuICAgKi9cclxuICB3aXRoQ3JlZGVudGlhbHMoKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBjb250ZW50IHR5cGUgaGVhZGVyIHdoaWNoIGluZGljYXRlcyB3aGF0IHR5cGUgb2YgY29udGVudCBpcyBiZWluZyBzZW5kIHRvIHRoZSBlbmRwb2ludC5cclxuICAgKiBcclxuICAgKiBCeSBkZWZhdWx0IHRoaXMgaXMgc2V0IHRvICdhcHBsaWNhdGlvbi9qc29uJy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFR5cGUgVGhlIHR5cGUgb2YgY29udGVudCB0aGF0IGlzIGJlaW5nIHNlbnQgdG8gdGhlIHNlcnZlci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Q2hhaW5YSFJ9XHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCByZXF1ZXN0ID0gbmV3IENoYWluWEhSKCk7XHJcbiAgICogXHJcbiAgICogcmVxdWVzdFxyXG4gICAqICAuY29udGVudFR5cGUoJ3gtd3d3LWZvcm1kYXRhJyk7XHJcbiAgICovXHJcbiAgY29udGVudFR5cGUoY29udGVudFR5cGU6IHN0cmluZyk6IENoYWluWEhSIHtcclxuXHJcbiAgICB0aGlzLl9yZXF1ZXN0LmNvbnRlbnRUeXBlID0gY29udGVudFR5cGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHF1ZXJ5IHBhcmFtZXRlciB0byBzZW5kIHdpdGggdGhlIHJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogVGhpcyBzaG91bGQgYmUgY2hhaW5lZCBtdWx0aXBsZSB0aW1lcyB0byBhZGQgbXVsdGlwbGUgcXVlcnkgcGFyYW1ldGVycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHF1ZXJ5IHBhcmFtZXRlciB0byBhZGQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUga2V5IGFkZGVkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn1cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC5xdWVyeVBhcmFtKCdoZWxsbycsICd3b3JsZCcpXHJcbiAgICogIC5xdWVyeVBhcmFtKCdjb3VudCcsIDUpO1xyXG4gICAqL1xyXG4gIHF1ZXJ5UGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiAoc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikpOiBDaGFpblhIUiB7XHJcblxyXG4gICAgY29uc3QgdmFsdWVOb3JtYWxpemVkOiBzdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QucXVlcnlQYXJhbXMucHVzaCh7IGtleToga2V5LCB2YWx1ZTogdmFsdWVOb3JtYWxpemVkIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGRhdGEgdG8gc2VuZCB0aHJvdWdoIHdpdGggdGhlIHJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHRvIHNlbmQgdGhyb3VnaCB3aXRoIHRoZSByZXF1ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn1cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiAvLyBTZW5kaW5nIGFuIG9iamVjdC5cclxuICAgKiBjb25zdCBvYmogPSB7IGhlbGxvOiAnd29ybGQnLCB5ZWFyOiAyMDE5IH07XHJcbiAgICogXHJcbiAgICogcmVxdWVzdFxyXG4gICAqICAuZGF0YShvYmopO1xyXG4gICAqIFxyXG4gICAqIC8vIFNlbmRpbmcga2V5IHZhbHVlIHBhaXJzIGluZGl2aWR1YWxseS5cclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC5kYXRhKCdoZWxsbycsICd3b3JsZCcpXHJcbiAgICogIC5kYXRhKCd5ZWFyJywgMjAxOSk7XHJcbiAgICovXHJcbiAgZGF0YShkYXRhOiAoT2JqZWN0IHwgc3RyaW5nKSk6IENoYWluWEhSIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICgoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSA9PT0gZmFsc2UpKSBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC5kYXRhID0gZGF0YTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgdGhhdCB0aGUgZGF0YSByZXR1cm5lZCBzaG91bGQgYmUgSlNPTiBwYXJzZWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfVxyXG4gICAqL1xyXG4gIGpzb24oKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFib3J0cyB0aGUgcmVxdWVzdCBpZiBpdCBhbHJlYWR5IGhhcyBiZWVuIHNlbnQuXHJcbiAgICogXHJcbiAgICogV2hlbiBhIHJlcXVlc3QgaXMgYWJvcnRlZCwgaXRzIHJlYWR5c3RhdGUgaXMgY2hhbmdlZCB0byAwIGFuZCB0aGUgc3RhdHVzIGNvZGUgaXMgc2V0IHRvIDAgYWxzby5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Q2hhaW5YSFJ9XHJcbiAgICovXHJcbiAgYWJvcnQoKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX1hIUi5hYm9ydCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgWEhSIHJlcXVlc3QgaXMgZmluaXNoZWQgYmVpbmcgYnVpbHQgYW5kIGlzIHJlYWR5IHRvIGJlIHNlbnQuXHJcbiAgICogXHJcbiAgICogVGhpcyBzaG91bGQgYWx3YXlzIGJlIHRoZSBmaW5hbCBtZXRob2QgdXNlZCBpbiBhbGwgcmVxdWVzdHMuXHJcbiAgICogXHJcbiAgICogQGFzeW5jXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC51cmwoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKVxyXG4gICAqICAubWV0aG9kKCdHRVQnKVxyXG4gICAqICAuc2VuZCgpO1xyXG4gICAqL1xyXG4gIGFzeW5jIHNlbmQoKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgdGhpcy5fcmVxdWVzdC5xdWVyeVBhcmFtcy5tYXAocXVlcnlQYXJhbSA9PiB0aGlzLl9yZXF1ZXN0LnVybCEuc2VhcmNoUGFyYW1zLmFwcGVuZChxdWVyeVBhcmFtLmtleSwgcXVlcnlQYXJhbS52YWx1ZSkpO1xyXG5cclxuICAgICAgdGhpcy5fWEhSID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICB0aGlzLl9YSFIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX1hIUi5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuX1hIUi5zdGF0dXMgPj0gMjAwKSByZXNvbHZlKHRoaXMuX1hIUi5yZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX1hIUi5zdGF0dXMgPj0gNDAwICYmIHRoaXMuX1hIUi5zdGF0dXMgPD0gNjAwKSByZWplY3QoKTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fWEhSLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycjogRXZlbnQpID0+IHJlamVjdChlcnIpKTtcclxuXHJcbiAgICAgIHRoaXMuX1hIUi5vcGVuKHRoaXMuX3JlcXVlc3QubWV0aG9kLCB0aGlzLl9yZXF1ZXN0LnVybCEuaHJlZiwgdHJ1ZSk7XHJcblxyXG4gICAgICB0aGlzLl9YSFIucmVzcG9uc2VUeXBlID0gPFhNTEh0dHBSZXF1ZXN0UmVzcG9uc2VUeXBlPnRoaXMuX3JlcXVlc3QucmVzcG9uc2VUeXBlO1xyXG5cclxuICAgICAgdGhpcy5fWEhSLndpdGhDcmVkZW50aWFscyA9IHRoaXMuX3JlcXVlc3Qud2l0aENyZWRlbnRpYWxzO1xyXG5cclxuICAgICAgdGhpcy5fWEhSLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHRoaXMuX3JlcXVlc3QuY29udGVudFR5cGUpO1xyXG5cclxuICAgICAgdGhpcy5fWEhSLnNlbmQodGhpcy5fcmVxdWVzdC5kYXRhISk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn07Il19