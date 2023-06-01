import { error, invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { changeUsernameData, finderUniqueID, finderUsernameExluded, findUsernameChangeReq, lockUsernameLoc, updateUser } from "$lib/sharedfunc";


let changeId:any

export const load: PageServerLoad = async ({ params }) => {
// Transform information from DB to a usable dictornary
  
  const data = await changeUsernameData()

  // Makes new element || new url and give data the client
  if (params) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.id == params.usernameChange) {
        changeId = element.id
        console.log(element.active)
        return element;
      }
    }
  }
  // If no element exists throws this
  throw error(404, "Page does not seem to exists");
};



export const actions: Actions = {
  changeRequest: async ({ request, params, locals}) => {
  	const form = await request.formData();

    //  requested name to change to
    const username:any = form?.get("username")
    
    // checks lenght of the username
    if (username.length < 5) {
  	return invalid(400, {message: "username is too short"} )
    }

    // Checks if a user by that username already exists
		let finder3 = await finderUsernameExluded(username)
    
    // Checks if their is a user with this username already
		if (username == finder3?.username) {
			return invalid(400, { message: "username already in use" })
    }

    // Finds the change request data
    let finder = await findUsernameChangeReq(changeId)

    // finds the user whos data is being changed
    const finder2 = await finderUniqueID(finder?.by)

    if(form) {
      // new username
      const newUsername ={ $set: {"username": username}}
      // Where in document to update
      const usernameLoc = {"username": finder2?.username}
      // update username
      updateUser(usernameLoc, newUsername)
      // New value for active in DB
      const locking ={ $set: {"active": false}}
      // location in DB
      const lockingLoc = {"active": true}
      // sets active to false in DB
      lockUsernameLoc(lockingLoc, locking)

    }
    
  }}

    

  
