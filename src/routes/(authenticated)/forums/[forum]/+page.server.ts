import type { Flashback } from ".svelte-kit/types/src/routes/(authenticated)/forum/proxy+page.server";
import { error, invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { finderUniqueID, forumConverter, kickout, sessionFinder, updateForum } from "$lib/sharedfunc";

export const load: PageServerLoad = async ({ params }) => {

  // List of all forums in a map/dictonary
  let data = await forumConverter()

  //  Slug of svelte with information from aboe
  if (params.forum) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // Checks if element matches with the parameters
      if (element.id == params.forum) {

        // converts the unique ID to names
        for (let i = 0; i < element.disscusion.length; i++) {
          let finder = await finderUniqueID(element.disscusion[i].sentBy)
          if (finder?.username == null) {
            element.disscusion[i].sentBy = "[DELETED USER]"
          } else {
            element.disscusion[i].sentBy = finder?.username
          }
        }

      // checks if user were found 
      let finder3 = await finderUniqueID(data[index].uploader)
        if (finder3) {
        element.uploader = finder3?.username
        } else {
          element.uploader = "[DELETED USER]"
        }
        return element;
      }
    }
  } 

  // If the URL id is wrong this is displayed as a message
  // throw redirect(404,"/error") 
  throw error(404, "Page does not seem to exists");
};



export const actions: Actions = {
  //  Makes you able to write in each forum posts
  write: async ({ request, params, locals}) => {
    const form = await request.formData();
    
    //  Kicks people out if their cookie has expired
    kickout(locals)

    let messageDisc = form?.get("messageDisc")

    // Target proper forum
    let targetedCollection = {"id": params.forum} 
    
    // finds the token
    let finder2 = await sessionFinder(locals.userid)
    // Adds a new comment to a disscusion with name of user aswell as created time and date

    var newvalues = { $push: {disscusion: {
      // message, their 
      message: messageDisc,
      // sender by username
      sentBy: finder2?.uniqueId,
      // date created
      createdAt: new Date()

    } } };
    // Updates forums comment section
    updateForum(targetedCollection, newvalues)

  }
}

    

  
