'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this._request.queryParams.map(function (queryParam) {
                    return _this._request.url.searchParams.append(queryParam.key, queryParam.value);
                  });

                  var xhr = new XMLHttpRequest();
                  xhr.addEventListener('readystatechange', function () {
                    if (xhr.readyState === 4 && xhr.status >= 200) resolve(xhr.response);else if (xhr.status >= 400 && xhr.status <= 600) reject();
                  });
                  xhr.addEventListener('error', function (err) {
                    return reject(err);
                  });
                  xhr.open(_this._request.method, _this._request.url.href, true);
                  xhr.responseType = _this._request.responseType;
                  xhr.withCredentials = _this._request.withCredentials;
                  xhr.setRequestHeader('Content-Type', _this._request.contentType);
                  xhr.send(_this._request.data);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function send() {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);
  return ChainXHR;
}(), _temp);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiR0VUIiwiUE9TVCIsIlBVVCIsIkRFTEVURSIsIm1ldGhvZCIsIk1FVEhPRFMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb250ZW50VHlwZSIsInF1ZXJ5UGFyYW1zIiwicmVzcG9uc2VUeXBlIiwidXJsIiwiX3JlcXVlc3QiLCJVUkwiLCJtZXRob2ROb3JtYWxpemVkIiwidG9VcHBlckNhc2UiLCJFcnJvciIsImtleSIsInZhbHVlIiwidmFsdWVOb3JtYWxpemVkIiwidG9TdHJpbmciLCJwdXNoIiwiZGF0YSIsIkZvcm1EYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFwIiwicXVlcnlQYXJhbSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsImVyciIsIm9wZW4iLCJocmVmIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsT0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0RBVXFCO0FBQ2pCQyxNQUFBQSxHQUFHLEVBQUUsS0FEWTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFLE1BRlc7QUFHakJDLE1BQUFBLEdBQUcsRUFBRSxLQUhZO0FBSWpCQyxNQUFBQSxNQUFNLEVBQUU7QUFKUyxLQVZyQjtBQUFBLHVEQXdCOEI7QUFDMUJDLE1BQUFBLE1BQU0sRUFBRSxLQUFLQyxPQUFMLENBQWFMLEdBREs7QUFFMUJNLE1BQUFBLGVBQWUsRUFBRSxLQUZTO0FBRzFCQyxNQUFBQSxXQUFXLEVBQUUsa0JBSGE7QUFJMUJDLE1BQUFBLFdBQVcsRUFBRSxFQUphO0FBSzFCQyxNQUFBQSxZQUFZLEVBQUU7QUFMWSxLQXhCOUI7QUFBQTs7QUFBQTtBQUFBOztBQWdDRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFoQ0Ysd0JBaURNQyxJQWpETixFQWlENkI7QUFFekIsV0FBS0MsUUFBTCxDQUFjRCxHQUFkLEdBQW9CLElBQUlFLEdBQUosQ0FBUUYsSUFBUixDQUFwQjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBekRGO0FBQUE7QUFBQSwyQkFrRlNOLE9BbEZULEVBa0ZtQztBQUUvQixVQUFNUyxnQkFBZ0IsR0FBR1QsT0FBTSxDQUFDVSxXQUFQLEVBQXpCOztBQUVBLFVBQUksQ0FBQyxLQUFLVCxPQUFMLENBQWFRLGdCQUFiLENBQUwsRUFBcUMsTUFBTSxJQUFJRSxLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUVyQyxXQUFLSixRQUFMLENBQWNQLE1BQWQsR0FBdUJTLGdCQUF2QjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOUZGO0FBQUE7QUFBQSxzQ0E4RzhCO0FBRTFCLFdBQUtGLFFBQUwsQ0FBY0wsZUFBZCxHQUFnQyxJQUFoQztBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdEhGO0FBQUE7QUFBQSxnQ0FzSWNDLFlBdElkLEVBc0k2QztBQUV6QyxXQUFLSSxRQUFMLENBQWNKLFdBQWQsR0FBNEJBLFlBQTVCO0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTlJRjtBQUFBO0FBQUEsK0JBZ0thUyxHQWhLYixFQWdLMEJDLEtBaEsxQixFQWdLd0U7QUFFcEUsVUFBTUMsZUFBdUIsR0FBR0QsS0FBSyxDQUFDRSxRQUFOLEVBQWhDOztBQUVBLFdBQUtSLFFBQUwsQ0FBY0gsV0FBZCxDQUEwQlksSUFBMUIsQ0FBK0I7QUFBRUosUUFBQUEsR0FBRyxFQUFFQSxHQUFQO0FBQVlDLFFBQUFBLEtBQUssRUFBRUM7QUFBbkIsT0FBL0I7O0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUExS0Y7QUFBQTtBQUFBLHlCQWdNT0csS0FoTVAsRUFnTTBDO0FBRXRDLFVBQUkseUJBQU9BLEtBQVAsTUFBZ0IsUUFBaEIsSUFBOEJBLEtBQUksWUFBWUMsUUFBakIsS0FBK0IsS0FBaEUsRUFBd0VELEtBQUksR0FBR0UsSUFBSSxDQUFDQyxTQUFMLENBQWVILEtBQWYsQ0FBUDtBQUV4RSxXQUFLVixRQUFMLENBQWNVLElBQWQsR0FBcUJBLEtBQXJCO0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRDs7Ozs7O0FBMU1GO0FBQUE7QUFBQSwyQkErTW1CO0FBRWYsV0FBS1YsUUFBTCxDQUFjRixZQUFkLEdBQTZCLE1BQTdCO0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXZORjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlEQTJPVyxJQUFJZ0IsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUV0QyxrQkFBQSxLQUFJLENBQUNoQixRQUFMLENBQWNILFdBQWQsQ0FBMEJvQixHQUExQixDQUE4QixVQUFBQyxVQUFVO0FBQUEsMkJBQUksS0FBSSxDQUFDbEIsUUFBTCxDQUFjRCxHQUFkLENBQW1Cb0IsWUFBbkIsQ0FBZ0NDLE1BQWhDLENBQXVDRixVQUFVLENBQUNiLEdBQWxELEVBQXVEYSxVQUFVLENBQUNaLEtBQWxFLENBQUo7QUFBQSxtQkFBeEM7O0FBRUEsc0JBQU1lLEdBQVEsR0FBRyxJQUFJQyxjQUFKLEVBQWpCO0FBRUFELGtCQUFBQSxHQUFHLENBQUNFLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUFNO0FBRTdDLHdCQUFJRixHQUFHLENBQUNHLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0JILEdBQUcsQ0FBQ0ksTUFBSixJQUFjLEdBQTFDLEVBQStDVixPQUFPLENBQUNNLEdBQUcsQ0FBQ0ssUUFBTCxDQUFQLENBQS9DLEtBRUssSUFBSUwsR0FBRyxDQUFDSSxNQUFKLElBQWMsR0FBZCxJQUFxQkosR0FBRyxDQUFDSSxNQUFKLElBQWMsR0FBdkMsRUFBNENULE1BQU07QUFFeEQsbUJBTkQ7QUFRQUssa0JBQUFBLEdBQUcsQ0FBQ0UsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBQ0ksR0FBRDtBQUFBLDJCQUFpQlgsTUFBTSxDQUFDVyxHQUFELENBQXZCO0FBQUEsbUJBQTlCO0FBRUFOLGtCQUFBQSxHQUFHLENBQUNPLElBQUosQ0FBUyxLQUFJLENBQUM1QixRQUFMLENBQWNQLE1BQXZCLEVBQStCLEtBQUksQ0FBQ08sUUFBTCxDQUFjRCxHQUFkLENBQW1COEIsSUFBbEQsRUFBd0QsSUFBeEQ7QUFFQVIsa0JBQUFBLEdBQUcsQ0FBQ3ZCLFlBQUosR0FBbUIsS0FBSSxDQUFDRSxRQUFMLENBQWNGLFlBQWpDO0FBRUF1QixrQkFBQUEsR0FBRyxDQUFDMUIsZUFBSixHQUFzQixLQUFJLENBQUNLLFFBQUwsQ0FBY0wsZUFBcEM7QUFFQTBCLGtCQUFBQSxHQUFHLENBQUNTLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLEtBQUksQ0FBQzlCLFFBQUwsQ0FBY0osV0FBbkQ7QUFFQXlCLGtCQUFBQSxHQUFHLENBQUNVLElBQUosQ0FBUyxLQUFJLENBQUMvQixRQUFMLENBQWNVLElBQXZCO0FBRUQsaUJBMUJNLENBM09YOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgTWV0aG9kcyBmcm9tICcuL2ludGVyZmFjZXMvTWV0aG9kcyc7XHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vaW50ZXJmYWNlcy9SZXF1ZXN0JztcclxuXHJcbi8qKlxyXG4gKiBjaGFpbi14aHIgcHJvdmlkZXMgYW4gZWFzeSB0byB1c2UgcHJvbWlzZSBiYmFzZWQgY2hhaW5hYmxlIEFQSSB0aGF0IG1ha2VzIGl0IHNpbXBsZSB0byBjcmVhdGUgYW55IGtpbmQgb2YgWEhSIHJlcXVlc3QuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENoYWluWEhSIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjb25zdGFudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlbGVjdCB0aGUgcmVxdWVzdGVkIGh0dHAgcmVxdWVzdCBtZXRob2QgZnJvbS5cclxuICAgKiBcclxuICAgKiBFdmVuIGlmIGEgcmVxdWVzdCBtZXRob2QgaXMgcHJvdmlkZWQgYnkgaGFuZCwgaXQgd2lsbCBiZSBkb3VibGUgY2hlY2tlZCBhZ2FpbnN0IHRoZSBvbmVzIGRlZmluZWQgaGVyZSB0byBtYWtlIHN1cmUgdGhhdCBpdFxyXG4gICAqIGlzIGEgdmFsaWQgcmVxdWVzdCBtZXRob2QuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICovXHJcbiAgTUVUSE9EUzogTWV0aG9kcyA9IHtcclxuICAgIEdFVDogJ0dFVCcsXHJcbiAgICBQT1NUOiAnUE9TVCcsXHJcbiAgICBQVVQ6ICdQVVQnLFxyXG4gICAgREVMRVRFOiAnREVMRVRFJ1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBidWlsZCBhbmQgc2VuZCB0aGUgZmluYWwgcmVxdWVzdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1JlcXVlc3R9XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXF1ZXN0OiBSZXF1ZXN0ID0ge1xyXG4gICAgbWV0aG9kOiB0aGlzLk1FVEhPRFMuR0VULFxyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICBxdWVyeVBhcmFtczogW10sXHJcbiAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgVVJMIHRoYXQgdGhpcyByZXF1ZXN0IHNob3VsZCBiZSBzZW50IHRvLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgcmVxdWVzdCBjYW4gZmFpbCBpZiBhbiBpbnZhbGlkIHVybCBpcyBwcm92aWRlZCBzbyBpdCBpcyByZWNvbW1lbmRlZCB0byB3cmFwIGl0IGluIGEgdHJ5Li5jYXRjaCBpZiB5b3UgYmVsaWV2ZSB0aGVyZSBpcyBhbnlcclxuICAgKiBjaGFuY2Ugb2YgdGhhdCBoYXBwZW5pbmcuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIHRvIHNlbmQgdGhpcyByZXF1ZXN0IHRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC51cmwoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKTtcclxuICAgKi9cclxuICB1cmwodXJsOiBzdHJpbmcpOiBDaGFpblhIUiB7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC51cmwgPSBuZXcgVVJMKHVybCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaHR0cCByZXF1ZXN0IG1ldGhvZCB0byBiZSB1c2VkIGJ5IHRoaXMgWEhSIHJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogQnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzIHNldCB0byAnR0VUJy5cclxuICAgKiBcclxuICAgKiBZb3UgY2FuIGNob29zZSB0byB0eXBlIGluIGEgc3RyaW5nIGRpcmVjdGx5IHN1Y2ggYXMgJ0dFVCcgb3IgJ2dldCcgb3IgeW91IGNhbiB1c2UgdGhlIFJFUVVFU1QgY29uc3RhbnQgb2YgQ2hhaW5YSFIgdG8gc2V0IHRoaXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBUaGUgaHR0cCByZXF1ZXN0IG1ldGhvZCB0byB1c2UgZm9yIHRoaXMgWEhSIHJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcmVxdWVzdCA9IG5ldyBDaGFpblhIUigpO1xyXG4gICAqIFxyXG4gICAqIC8vIFVzaW5nIGEgc3RyaW5nIGRpcmVjdGx5OlxyXG4gICAqIHJlcXVlc3RcclxuICAgKiAgLnVybCgnaHR0cHM6Ly9leGFtcGxlLmNvbScpXHJcbiAgICogIC5tZXRob2QoJ0dFVCcpO1xyXG4gICAqIFxyXG4gICAqIC8vIFVzaW5nIHRoZSBjb25zdGFudDpcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC51cmwoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKTtcclxuICAgKiAgLm1ldGhvZChyZXF1ZXN0Lk1FVEhPRC5HRVQpO1xyXG4gICAqL1xyXG4gIG1ldGhvZChtZXRob2Q6IHN0cmluZyk6IENoYWluWEhSIHtcclxuXHJcbiAgICBjb25zdCBtZXRob2ROb3JtYWxpemVkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLk1FVEhPRFNbbWV0aG9kTm9ybWFsaXplZF0pIHRocm93IG5ldyBFcnJvcignQW4gdW5zdXBwb3J0ZWQgaHR0cCByZXF1ZXN0IG1ldGhvZCB3YXMgY2hvc2VuJyk7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC5tZXRob2QgPSBtZXRob2ROb3JtYWxpemVkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhpcyByZXF1ZXN0IHRvIGJlIG1hZGUgd2l0aCBjcmVkZW50aWFscyBzdWNoIGFzIGNvb2tpZXMsIGF1dGhvcml6YXRpb24gaGVhZGVycywgb3IgVExTIGNlcnRpZmljYXRlcy5cclxuICAgKiBcclxuICAgKiBCeSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaGFzIG5vIGVmZmVjdCBvbiBzYW1lLXNpdGUgcmVxdWVzdHMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcmVxdWVzdCA9IG5ldyBDaGFpblhIUigpO1xyXG4gICAqIFxyXG4gICAqIHJlcXVlc3RcclxuICAgKiAgLndpdGhDcmVkZW50aWFscygpO1xyXG4gICAqL1xyXG4gIHdpdGhDcmVkZW50aWFscygpOiBDaGFpblhIUiB7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGNvbnRlbnQgdHlwZSBoZWFkZXIgd2hpY2ggaW5kaWNhdGVzIHdoYXQgdHlwZSBvZiBjb250ZW50IGlzIGJlaW5nIHNlbmQgdG8gdGhlIGVuZHBvaW50LlxyXG4gICAqIFxyXG4gICAqIEJ5IGRlZmF1bHQgdGhpcyBpcyBzZXQgdG8gJ2FwcGxpY2F0aW9uL2pzb24nLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50VHlwZSBUaGUgdHlwZSBvZiBjb250ZW50IHRoYXQgaXMgYmVpbmcgc2VudCB0byB0aGUgc2VydmVyLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaGFpblhIUn1cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgQ2hhaW5YSFIoKTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC5jb250ZW50VHlwZSgneC13d3ctZm9ybWRhdGEnKTtcclxuICAgKi9cclxuICBjb250ZW50VHlwZShjb250ZW50VHlwZTogc3RyaW5nKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QuY29udGVudFR5cGUgPSBjb250ZW50VHlwZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgcXVlcnkgcGFyYW1ldGVyIHRvIHNlbmQgd2l0aCB0aGUgcmVxdWVzdC5cclxuICAgKiBcclxuICAgKiBUaGlzIHNob3VsZCBiZSBjaGFpbmVkIG11bHRpcGxlIHRpbWVzIHRvIGFkZCBtdWx0aXBsZSBxdWVyeSBwYXJhbWV0ZXJzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcXVlcnkgcGFyYW1ldGVyIHRvIGFkZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBrZXkgYWRkZWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfVxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcmVxdWVzdCA9IG5ldyBDaGFpblhIUigpO1xyXG4gICAqIFxyXG4gICAqIHJlcXVlc3RcclxuICAgKiAgLnF1ZXJ5UGFyYW0oJ2hlbGxvJywgJ3dvcmxkJylcclxuICAgKiAgLnF1ZXJ5UGFyYW0oJ2NvdW50JywgNSk7XHJcbiAgICovXHJcbiAgcXVlcnlQYXJhbShrZXk6IHN0cmluZywgdmFsdWU6IChzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSk6IENoYWluWEhSIHtcclxuXHJcbiAgICBjb25zdCB2YWx1ZU5vcm1hbGl6ZWQ6IHN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC5xdWVyeVBhcmFtcy5wdXNoKHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZU5vcm1hbGl6ZWQgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgZGF0YSB0byBzZW5kIHRocm91Z2ggd2l0aCB0aGUgcmVxdWVzdC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIGRhdGEgdG8gc2VuZCB0aHJvdWdoIHdpdGggdGhlIHJlcXVlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfVxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcmVxdWVzdCA9IG5ldyBDaGFpblhIUigpO1xyXG4gICAqIFxyXG4gICAqIC8vIFNlbmRpbmcgYW4gb2JqZWN0LlxyXG4gICAqIGNvbnN0IG9iaiA9IHsgaGVsbG86ICd3b3JsZCcsIHllYXI6IDIwMTkgfTtcclxuICAgKiBcclxuICAgKiByZXF1ZXN0XHJcbiAgICogIC5kYXRhKG9iaik7XHJcbiAgICogXHJcbiAgICogLy8gU2VuZGluZyBrZXkgdmFsdWUgcGFpcnMgaW5kaXZpZHVhbGx5LlxyXG4gICAqIHJlcXVlc3RcclxuICAgKiAgLmRhdGEoJ2hlbGxvJywgJ3dvcmxkJylcclxuICAgKiAgLmRhdGEoJ3llYXInLCAyMDE5KTtcclxuICAgKi9cclxuICBkYXRhKGRhdGE6IChPYmplY3QgfCBzdHJpbmcpKTogQ2hhaW5YSFIge1xyXG4gICAgXHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICgoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSA9PT0gZmFsc2UpKSBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblxyXG4gICAgdGhpcy5fcmVxdWVzdC5kYXRhID0gZGF0YTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgdGhhdCB0aGUgZGF0YSByZXR1cm5lZCBzaG91bGQgYmUgSlNPTiBwYXJzZWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NoYWluWEhSfVxyXG4gICAqL1xyXG4gIGpzb24oKTogQ2hhaW5YSFIge1xyXG5cclxuICAgIHRoaXMuX3JlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB0aGF0IHRoZSBYSFIgcmVxdWVzdCBpcyBmaW5pc2hlZCBiZWluZyBidWlsdCBhbmQgaXMgcmVhZHkgdG8gYmUgc2VudC5cclxuICAgKiBcclxuICAgKiBUaGlzIHNob3VsZCBhbHdheXMgYmUgdGhlIGZpbmFsIG1ldGhvZCB1c2VkIGluIGFsbCByZXF1ZXN0cy5cclxuICAgKiBcclxuICAgKiBAYXN5bmNcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcmVxdWVzdCA9IG5ldyBDaGFpblhIUigpO1xyXG4gICAqIFxyXG4gICAqIHJlcXVlc3RcclxuICAgKiAgLnVybCgnaHR0cHM6Ly9leGFtcGxlLmNvbScpXHJcbiAgICogIC5tZXRob2QoJ0dFVCcpXHJcbiAgICogIC5zZW5kKCk7XHJcbiAgICovXHJcbiAgYXN5bmMgc2VuZCgpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICB0aGlzLl9yZXF1ZXN0LnF1ZXJ5UGFyYW1zLm1hcChxdWVyeVBhcmFtID0+IHRoaXMuX3JlcXVlc3QudXJsIS5zZWFyY2hQYXJhbXMuYXBwZW5kKHF1ZXJ5UGFyYW0ua2V5LCBxdWVyeVBhcmFtLnZhbHVlKSk7XHJcblxyXG4gICAgICBjb25zdCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID49IDIwMCkgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xyXG5cclxuICAgICAgICBlbHNlIGlmICh4aHIuc3RhdHVzID49IDQwMCAmJiB4aHIuc3RhdHVzIDw9IDYwMCkgcmVqZWN0KCk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnI6IHN0cmluZykgPT4gcmVqZWN0KGVycikpO1xyXG5cclxuICAgICAgeGhyLm9wZW4odGhpcy5fcmVxdWVzdC5tZXRob2QsIHRoaXMuX3JlcXVlc3QudXJsIS5ocmVmLCB0cnVlKTtcclxuXHJcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXF1ZXN0LnJlc3BvbnNlVHlwZTtcclxuXHJcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0aGlzLl9yZXF1ZXN0LndpdGhDcmVkZW50aWFscztcclxuXHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCB0aGlzLl9yZXF1ZXN0LmNvbnRlbnRUeXBlKTtcclxuXHJcbiAgICAgIHhoci5zZW5kKHRoaXMuX3JlcXVlc3QuZGF0YSEpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG59OyJdfQ==