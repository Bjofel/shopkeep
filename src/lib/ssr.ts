export let streams: Record<
    string,
    { controller: ReadableStreamDefaultController; prod: string }
>;

export function init_ssr() {
    streams = {};
}