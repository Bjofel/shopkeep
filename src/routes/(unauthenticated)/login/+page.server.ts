import { invalid as fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as crypto from "crypto";
import { randomtoken } from '$lib/sharedfunc';
import { Management as manage } from '$lib/implements';

let Management: manage = new manage()


export const actions: Actions = {
	login: async ({ request, locals, cookies, event }) => {


		const form = await request.formData();

		// Sets the seesoin token into a variable
		const sessionToken = randomtoken()

		//   Username
		const username = form?.get("username")?.toString()
		//	 Password
		const password = form?.get("password")?.toString()



		// Checks if Password or Username is missing and if their not equal to strings
		if (!username || !password || typeof username !== "string" || typeof password !== "string") {
			return fail(400, { message: "stuff missing" })
		}

		// If the data returned is valid
		if (form) {


			// Finds the User in the collection
			const finder = await Management.findUserDetails(username)

			// Checks if username does not match any user in DB
			if (!finder || username !== finder?.username) {
				return fail(400, { message: "Incorrect Username or password make sure you've type correctly" })
			}
			// Hash the password to add extra security with salt aswell as to authenticate
			const hash = crypto.pbkdf2Sync(password, finder?.salt, 1000, 64, 'sha512').toString('hex');

			// Checks if the password in DB is not the same as Password sent by client
			if (finder?.password != hash) {
				return fail(400, { message: "Incorrect Username or password make sure you've type correctly" })
			}

			// Sets a seeesion token in the DBb
			await Management.createToken(finder?.uniqueID, sessionToken, username)

			// Sets a session token in the Cookies
			cookies.set('userid', sessionToken, {
				path: '/',
				httpOnly: true, // optional for now
				sameSite: 'strict',// optional for now
				secure: process.env.NODE_ENV === 'production',// optional for now
				maxAge: 604800 // seconds
			})

			throw redirect(308, '/catalog')


		} else {
			return fail(400, { message: "FAILED TO PROCESS REQUEST" })
		}



	},
};
