import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as crypto from "crypto";
import { createToken, createUser, finderUsernameExluded, rand, randomtoken } from '$lib/sharedfunc';
import { Management, unauthedUser } from '$lib/implements';
import type { detailVetted } from '$lib/interface';
import { detach } from 'svelte/internal';

let found = false
let passwordSecured = true
let shortName = false


// checks the lenght of password and username
function lenghtChecker(username: string, password: string) {
	if (username.toString().length < 5) {
		shortName = true
		return fail(400, { message: "username is too short" })
	}
	// Changes a variable to false depending IF the username is more than 5 characters
	if (username.toString().length >= 5) {
		shortName = false
	}
	// Checks if password length is less than 5 characters
	if (password.toString().length < 5) {
		passwordSecured = false
		return fail(400, { message: "Password is too weak" })
	}

	// Changes a variable to true depending IF the password is more than 5 characters
	if (password.toString().length >= 5) {
		passwordSecured = true
	}
}


export const actions: Actions = {
	register: async ({ request, locals, cookies }) => {

		try {

			const form = await request.formData();



			let username: string | undefined;
			let password: string | undefined;


			// if data were transmitted succesfully
			if (form) {
				// variable for the class
				let user: unauthedUser

				// sets variable to for usename and password
				username = form?.get("username")?.toString()
				password = form?.get("password")?.toString()

				// checks the type to make sure their both have string

				// checks if their types are strings and initated the class
				if (typeof username === "string" && typeof password === "string") {
					user = new unauthedUser(username, password)

				} else {
					// returns invalid IF password or username either is missing or wrong type
					return fail(400, { message: "Stuff Missing" })
				}

				// checks if username does already exists | Prevents create if found
				if (await (await user.existCheck()).result !== null) {
					return fail(400, { message: "user already exists" })

				}

				lenghtChecker(username, password)

				// Creating a unique salt for a particular user
				let salt: string = crypto.randomBytes(16).toString('hex');

				// admin settings
				let management: Management = new Management()
				// Checks if user has a too short username, Check if password is more than or equal to 5 character, Checsk if username has been finder in collection
				if (shortName == false && passwordSecured == true && found == false) {

					// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
					const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

					// creates a randomURL
					const randomDefaultUrl = rand() + rand()

					// Creates a new entry in the user collection
					management.createUser(username, hash, salt, randomDefaultUrl)

					// 
					const findUser: detailVetted = await management.findUser(username)

					// creates a session token
					const sessionToken = randomtoken()

					// creates a cookie in DB
					await management.createToken(findUser.uniqueID, sessionToken, username)

					// Sets a session token in the Cookies
					cookies.set('userid', sessionToken, {
						path: '/',
						httpOnly: true, // optional for now
						sameSite: 'strict',// optional for now
						secure: process.env.NODE_ENV === 'production',// optional for now
						maxAge: 604800 // seconds || Sets it to a year which is max allowed by law
					})

					// Redirects to home after register
					throw redirect(302, '/catalog')
				}
			}

		} catch (e) {
			console.log(e)
		}




	},
};
