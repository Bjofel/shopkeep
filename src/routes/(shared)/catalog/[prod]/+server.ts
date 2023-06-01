import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { streams } from "$lib/ssr";

import { DBexporter } from '$lib/implements';

const productDB: DBexporter = new DBexporter()


export const GET: RequestHandler = async ({ locals, params }) => {
    if (params.prod) {
        try {
            const products = await productDB.prodList();
            const prod = products.find((e) => e.URL == params.prod)
            if (prod && locals.userid) {
                const stream = new ReadableStream({
                    start(controller) {
                        /* save the controller for the stream so that we can */
                        /* enqueue messages into the stream */
                        streams[locals.userid!] = { controller, prod: params.prod };
                    },
                    cancel() {
                        /* remove the stream */
                        const stream = streams[locals.userid];
                        stream.controller.close()
                        delete streams[locals.userid!];
                    },
                });

                return new Response(stream, {
                    headers: {
                        "content-type": "text/event-stream",
                    },
                });
            }
        } catch {
            throw error(404, "database items not found");
        }
    }

    throw error(404, "database items not found");
};
