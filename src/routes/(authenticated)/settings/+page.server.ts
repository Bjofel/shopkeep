import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { User } from '$lib/implements';


export const actions: Actions = {
	// Logs out the users
	logout: async ({ request, locals, cookies }) => {

		const authUser: User = new User(locals.userid)

		// Delets the cookie from the servre
		authUser.removeToken()

		// deletets cookie with session id
		cookies.delete('userid')
		// redirects user back to login
		throw redirect(302, '/login')

	},
	// deletes account
	deleteaccount: async ({ request, locals, cookies }) => {


		const authUser: User = new User(locals.userid)

		// checks to see IF session token is valid	
		if (await authUser.valid() == false) {
			return fail(400, { message: "Invalid token" })
		}

		// finds sesion token from locas
		const finder2 = await authUser.getWho()

		// Deletes the tokens autorisation
		authUser.removeToken()

		// Finds the user in the user data base and removes the whole set
		await authUser.removeAcc(finder2?.uniqueId)

		// delets the cookie on the client
		cookies.delete('userid')
		// redirects the user back to register
		throw redirect(302, '/register')
	},
}
