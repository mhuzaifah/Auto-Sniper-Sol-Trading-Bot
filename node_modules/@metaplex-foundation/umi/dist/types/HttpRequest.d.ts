import type { GenericAbortSignal } from './GenericAbortSignal';
import type { HttpHeaderValue, HttpRequestHeaders } from './HttpHeaders';
/** Defines a number in milliseconds. */
type Milliseconds = number;
/**
 * Defines a HTTP Request with custom data.
 * @category Http
 */
export type HttpRequest<D = any> = {
    method: HttpMethod;
    url: string;
    data: D;
    headers: HttpRequestHeaders;
    maxRedirects?: number;
    timeout?: Milliseconds;
    signal?: GenericAbortSignal;
};
/**
 * Creates a new {@link HttpRequestBuilder} instance.
 * @category Http
 */
export declare const request: () => HttpRequestBuilder<undefined>;
/**
 * A builder for constructing {@link HttpRequest} instances.
 * @category Http
 */
export declare class HttpRequestBuilder<D> implements HttpRequest<D> {
    protected readonly request: HttpRequest<D>;
    constructor(request: HttpRequest<D>);
    asJson(): HttpRequestBuilder<D>;
    asMultipart(): HttpRequestBuilder<D>;
    asForm(): HttpRequestBuilder<D>;
    accept(contentType: string): HttpRequestBuilder<D>;
    contentType(contentType: string): HttpRequestBuilder<D>;
    userAgent(userAgent: string): HttpRequestBuilder<D>;
    withToken(token: string, type?: string): HttpRequestBuilder<D>;
    withHeader(key: string, value: HttpHeaderValue): HttpRequestBuilder<D>;
    withHeaders(headers: HttpRequestHeaders): HttpRequestBuilder<D>;
    dontFollowRedirects(): HttpRequestBuilder<D>;
    followRedirects(maxRedirects?: number): HttpRequestBuilder<D>;
    withoutTimeout(): HttpRequestBuilder<D>;
    withTimeout(timeout?: Milliseconds): HttpRequestBuilder<D>;
    withAbortSignal(signal?: GenericAbortSignal): HttpRequestBuilder<D>;
    withEndpoint(method: HttpMethod, url: string): HttpRequestBuilder<D>;
    withParams(params: string | URLSearchParams | string[][] | Record<string, string>): HttpRequestBuilder<D>;
    withData<T>(data: T): HttpRequestBuilder<T>;
    get(url: string): HttpRequestBuilder<D>;
    post(url: string): HttpRequestBuilder<D>;
    put(url: string): HttpRequestBuilder<D>;
    patch(url: string): HttpRequestBuilder<D>;
    delete(url: string): HttpRequestBuilder<D>;
    get method(): HttpMethod;
    get url(): string;
    get data(): D;
    get headers(): HttpRequestHeaders;
    get maxRedirects(): number | undefined;
    get timeout(): Milliseconds | undefined;
    get signal(): GenericAbortSignal | undefined;
}
/**
 * Defines a HTTP method as a string.
 * @category Http
 */
export type HttpMethod = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
export {};
