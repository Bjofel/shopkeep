import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


// sends information to server
export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    return locals
}