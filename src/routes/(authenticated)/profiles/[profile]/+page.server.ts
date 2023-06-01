import type { Flashback } from ".svelte-kit/types/src/routes/(authenticated)/forum/proxy+page.server";
import { error, invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as database from '$lib/database'
import { kickout } from "$lib/sharedfunc";

const client = await database.connect()
//  Gateway to the main branch
const db = client.db("test")
//  Gateway to forum database
const forumMessages = db.collection("forum_messages")
// gateway to the session token
const tokenCollection = db.collection("token")
// gateway to the user collectoin
const collection = db.collection("users")



  


export const load: PageServerLoad = async ({ params }) => {
    // loads data from the database
 let data:any = await (await collection.find().toArray()).map((myDoc)=>{return {
              _id: myDoc._id.toString(),
              username: myDoc.username,
              customUrl: myDoc.customUrl
          }})

  
  //  Slug of svelte with information from aboe
  if (params) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(data)
      // Checks if element matches with the parameters
      if (element.id == params) {
        return element;
      }
    }
  } 

  // If the URL id is wrong this is displayed as a message
  throw error(404, "Page does not seem to exists");
};



export const actions: Actions = {
  //  Makes you able to write in each forum posts
  write: async ({ request, params, locals}) => {
    const form = await request.formData();

  }
}

    

  
