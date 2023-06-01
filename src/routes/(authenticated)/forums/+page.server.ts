import type { Actions, PageServerLoad } from './$types';
import { addForum, forumConverter, kickout, sessionFinder } from '$lib/sharedfunc';


export const load: PageServerLoad = async () => {

    //     // loads data from all the forums with array's and dictonary's
    //   let data = await forumConverter()

    //     return { 
    //         // return back the data from forum database
    //         "formums": data
    //      };
};

export const actions: Actions = { // This action handles the posting on the forum
    // posting: async ({ request, locals }) => {
    //     const form = await request.formData();

    //     if (form) {
    //     // Title of the post
    //     const postTitle:any = form?.get("postTitle")
    //     // The body of the post
    //     const postingMessage:any = form?.get("msg")

    //     //  Finds the session token from locals
    // 	let finder = await sessionFinder(locals.userid)

    //     if(!finder || null){
    //         kickout(locals)
    //     }
    //     //  checks if person has valid session token
    //     kickout(locals)

    //     // Adds another forum by user
    //     addForum(postTitle, finder?.uniqueId, postingMessage)

    //     }        
    // }
}
