import { DBexporter } from '$lib/implements';
import type { RequestHandler } from './$types';

const productDB: DBexporter = new DBexporter()


export const GET: RequestHandler = ({ request }) {
    const ac = new AbortController();

    const stream = new ReadableStream({
        async start(controller) {
            let items = await productDB.prodList()
            controller.enqueue(items)

        },
        cancel() {
            console.log("cancel and abort");
            ac.abort();
        },
    })

    return new Response(stream, {
        headers: {
            'content-type': 'text/event-stream',
        }
    });
}