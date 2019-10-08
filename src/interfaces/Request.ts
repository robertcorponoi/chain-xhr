'use strict'

/**
 * Defines the structure of a XHR request.
 */
export default interface Request {

  /**
   * The URL that the request should be sent to.
   */
  url?: URL;

  /**
   * The http request method that should be used for this request.
   */
  method: string;

  /**
   * Indicates whether this request will be made with credentials or not.
   */
  withCredentials: boolean;

  /**
   * The content type of the content being sent to the endpoint.
   */
  contentType: string;

  /**
   * The query parameters to add to the end of the request url.
   */
  queryParams: Array<any>;

  /**
   * The type of data that the response should be.
   */
  responseType: string;

  /**
   * The data to send with the request.
   */
  data?: any;

};