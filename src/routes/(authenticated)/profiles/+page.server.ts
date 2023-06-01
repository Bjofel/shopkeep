import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Timestamp } from 'bson';
import { kickout } from '$lib/sharedfunc';



export const load: PageServerLoad = async () => { 

    
}
   

export const actions: Actions = {

    search: async ({ request, locals, cookies }) => { 

        
    }
}