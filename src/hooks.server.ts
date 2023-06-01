import { init_ssr } from '$lib/ssr';
import type { Handle } from '@sveltejs/kit';

// hooks.server.ts runs once on server startup
// this is a good place to do initialization of db and other stuff.
init_ssr();

export const handle: Handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (userid) {
		event.locals.userid = userid;
	}


	return resolve(event);
};
