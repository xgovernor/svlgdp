/**
 * A strongly-typed wrapper around the global `fetch` function that returns a JSON-parsed response.
 *
 * @param input - The input to be passed to the global `fetch` function.
 * @param init - An object containing any custom settings that you want to apply to the request.
 * @returns A promise that resolves to the parsed JSON response.
 */
export const fetcher = <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => fetch(input, init).then((res) => res.json() as Promise<T>);

console.log("fetcher loaded");
