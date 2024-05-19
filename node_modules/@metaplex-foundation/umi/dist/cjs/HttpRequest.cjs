'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** Defines a number in milliseconds. */

/**
 * Defines a HTTP Request with custom data.
 * @category Http
 */

/**
 * Creates a new {@link HttpRequestBuilder} instance.
 * @category Http
 */
const request = () => new HttpRequestBuilder({
  method: 'get',
  data: undefined,
  headers: {},
  url: ''
});

/**
 * A builder for constructing {@link HttpRequest} instances.
 * @category Http
 */
class HttpRequestBuilder {
  constructor(request) {
    this.request = request;
  }
  asJson() {
    return this.contentType('application/json');
  }
  asMultipart() {
    return this.contentType('multipart/form-data');
  }
  asForm() {
    return this.contentType('application/x-www-form-urlencoded');
  }
  accept(contentType) {
    return this.withHeader('accept', contentType);
  }
  contentType(contentType) {
    return this.withHeader('content-type', contentType);
  }
  userAgent(userAgent) {
    return this.withHeader('user-agent', userAgent);
  }
  withToken(token, type = 'Bearer') {
    return this.withHeader('authorization', `${type} ${token}`);
  }
  withHeader(key, value) {
    return this.withHeaders({
      [key]: value
    });
  }
  withHeaders(headers) {
    return new HttpRequestBuilder({
      ...this.request,
      headers: {
        ...this.request.headers,
        ...headers
      }
    });
  }
  dontFollowRedirects() {
    return this.followRedirects(0);
  }
  followRedirects(maxRedirects) {
    return new HttpRequestBuilder({
      ...this.request,
      maxRedirects
    });
  }
  withoutTimeout() {
    return this.withTimeout(0);
  }
  withTimeout(timeout) {
    return new HttpRequestBuilder({
      ...this.request,
      timeout
    });
  }
  withAbortSignal(signal) {
    return new HttpRequestBuilder({
      ...this.request,
      signal
    });
  }
  withEndpoint(method, url) {
    return new HttpRequestBuilder({
      ...this.request,
      method,
      url
    });
  }
  withParams(params) {
    const url = new URL(this.request.url);
    const newSearch = new URLSearchParams(params);
    const search = new URLSearchParams(url.searchParams);
    [...newSearch.entries()].forEach(([key, val]) => {
      search.append(key, val);
    });
    url.search = search.toString();
    return new HttpRequestBuilder({
      ...this.request,
      url: url.toString()
    });
  }
  withData(data) {
    return new HttpRequestBuilder({
      ...this.request,
      data
    });
  }
  get(url) {
    return this.withEndpoint('get', url);
  }
  post(url) {
    return this.withEndpoint('post', url);
  }
  put(url) {
    return this.withEndpoint('put', url);
  }
  patch(url) {
    return this.withEndpoint('patch', url);
  }
  delete(url) {
    return this.withEndpoint('delete', url);
  }
  get method() {
    return this.request.method;
  }
  get url() {
    return this.request.url;
  }
  get data() {
    return this.request.data;
  }
  get headers() {
    return this.request.headers;
  }
  get maxRedirects() {
    return this.request.maxRedirects;
  }
  get timeout() {
    return this.request.timeout;
  }
  get signal() {
    return this.request.signal;
  }
}

/**
 * Defines a HTTP method as a string.
 * @category Http
 */

exports.HttpRequestBuilder = HttpRequestBuilder;
exports.request = request;
//# sourceMappingURL=HttpRequest.cjs.map
