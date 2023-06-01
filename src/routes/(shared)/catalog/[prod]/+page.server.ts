import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DBexporter, User } from "$lib/implements";
import { streams } from "$lib/ssr";

let DBexport = new DBexporter()


export const load: PageServerLoad = async ({ params }) => {
  // List of all forums in a map/dictonary
  let data = await DBexport.prodList()

  //  Slug of svelte with information from aboe
  if (params.prod) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // Checks if element matches with the parameters
      if (element.URL == params.prod) {

        // converts the unique ID to names
        // for (let i = 0; i < element.disscusion.length; i++) {
        //   let finder = await finderUniqueID(element.disscusion[i].sentBy)
        //   if (finder?.username == null) {
        //     element.disscusion[i].sentBy = "[DELETED USER]"
        //   } else {
        //     element.disscusion[i].sentBy = finder?.username
        //   }
        // }

        // checks if user were found 
        // let finder3 = await finderUniqueID(data[index].uploader)
        // if (finder3) {
        //   element.uploader = finder3?.username
        // } else {
        //   element.uploader = "[DELETED USER]"
        // }
        return element;
      }
    }
  }

  // If the URL id is wrong this is displayed as a message
  // throw redirect(404,"/error") 
  throw error(404, "Page does not seem to exists");
};

export const actions: Actions = {
  changeRequest: async ({ request, params, locals }) => {


  },

  //  Makes you able to write in each forum posts
  write: async ({ request, params, locals }) => {

    let user = new User(locals.userid)

    const form = await request.formData();

    let messageDisc = form?.get("messageDisc")

    //Target proper product 
    let targetedCollection = { "url": params.prod }

    //   // Adds a new comment to a prod page with name of user aswell as created time and date


    let sender = await user.getWho()
    var newvalues = {
      $push: {
        comments: {
          // message, their 
          message: messageDisc,
          // sender by username
          sentBy: sender.username,
          // date created
          createdAt: new Date()

        }
      }
    };

    DBexport.updateProd(targetedCollection, newvalues)

    const encoder = new TextEncoder();
    const encoded = encoder.encode(
      "data: " + JSON.stringify({
        // message, their 
        message: messageDisc,
        // sender by username
        sentBy: sender.username,
        // date created
        createdAt: new Date()

      }) + "\n\n"
    );

    console.log(streams);

    for (const session in streams) {
      /* send messages to all other streams exept own for this chat */

      const connection = streams[session];
      console.log(session)
      if (connection.prod == params.prod && session != locals.userid) {
        /* enqueue messages to all streams for this chat */
        try {
          connection.controller.enqueue(encoded);
        } catch (e) {
          console.error("Failure sending sse over connection : " + e);
        }
      }
    }

  }




  //   // finds the token
  //   let finder2 = await sessionFinder(locals.userid)

  //   // Updates forums comment section
  //   updateForum(targetedCollection, newvalues)

}




