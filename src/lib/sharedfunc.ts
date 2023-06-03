// import { redirect } from "@sveltejs/kit";
// import * as database from '$lib/database'
// import { User } from "./implements";

// const client = await database.connect()

// //  Gateway to the main branch
// const db = client.db("projekt")

// //  Gateway to forum database
// // const forumDB = db.collection("forum_messages")

// // gateway to the session token
// const sessionTokenDB = db.collection("token")

// // gateway to the user collectoin
// const userDB = db.collection("users")

// // Gateway to Username change rquest DB
// // const usernameChangeReq = db.collection("change_username")

// // const passwordChangeReq = db.collection("change_password")

// // If user does not have a valid cookie it kicks them out and prevents them from doing any actions
// export function kickout(locals: any) {
//     if (locals.userid == null) {
//         throw redirect(302, "/login")
//     }
// }

// // Finds a users through their unique ID, Excluding informatoin as passwords and salt from being retrived
// export async function finderUniqueID(uniqueIDreq: any) {
//     const result = await userDB.findOne({ "uniqueId": uniqueIDreq }, { projection: { password: 0, salt: 0 } })
//     return result
// }

// // Finds the uesr through their usename
// export async function finderUsername(username: any) {
//     const result = await userDB.findOne({ "username": username })
//     return result
// }

// export async function finderUsernameExluded(username: any) {
//     const result = await userDB.findOne({ "username": username }, { projection: { password: 0, salt: 0 } })
//     return result
// }

// // export async function findMany(params: type) {

// // }

// // deletes the user
// // userDB = the database the user's information resides in,
// // inforToLookFor = the information that the database shall be looking for
// export async function deletion(infoToLookFor: any) {
//     userDB.deleteOne({ "uniqueId": infoToLookFor })
// }

// // Updates the forum's comment section
// // export function updateForum(target: any, value: any) {
// //     forumDB.updateOne(target, value)
// // }

// // finds a sessiontoken
// export async function sessionFinder(cookieToken: any) {
//     const result = await sessionTokenDB.findOne({ "sessionToken": cookieToken })
//     return result
// }

// // deletes the sessiontoken from the DB
// export async function sessionDeletion(cookieToken: any) {
//     await sessionTokenDB.deleteOne({ "sessionToken": cookieToken })
// }
// // returns a list of all forums in form of a dictornay [BELONGS TO FORUM SLUG]
// // export async function forumConverter() {
// //     // finds all forums in DB
// //     // Converts it to an array
// //     // adds values into the array by the following arangement through a dictonary
// //     const data: any = await (await forumDB.find().toArray()).map((myDoc) => {
// //         return {
// //             _id: myDoc._id.toString(),
// //             id: myDoc.id,
// //             postTitle: myDoc.postTitle,
// //             uploader: myDoc.uploader,
// //             createdAt: myDoc.createdAt,
// //             posterTalk: myDoc.posterTalk,
// //             disscusion: myDoc.disscusion
// //         }
// //     })
// //     return data
// // }

// // export async function changeUsernameData() {

// //     const data: any = await (await usernameChangeReq.find().toArray()).map((myDoc) => {
// //         return {
// //             _id: myDoc._id.toString(),
// //             id: myDoc.id,
// //             by: myDoc.by,
// //             createdAt: myDoc.createdAt,
// //             active: myDoc.active,
// //         }
// //     })
// //     return data
// // }

// // export async function changePasswordData() {
// //     const data: any = await (await passwordChangeReq.find().toArray()).map((myDoc) => {
// //         return {
// //             _id: myDoc._id.toString(),
// //             id: myDoc.id,
// //             by: myDoc.by,
// //             createdAt: myDoc.createdAt,
// //             active: myDoc.active,
// //         }
// //     })
// //     return data
// // }

// // adds another forum ot forumDB
// // export function addForum(postingTitle: string, uploader: string, postingMessage: string) {
// //     forumDB.insertOne({ 'id': crypto.randomUUID(), "postTitle": postingTitle, "uploader": uploader, "createdAt": new Date(), 'posterTalk': postingMessage, 'disscusion': [] })
// // }

// // change username request, Inserts a active DB change URL in the change_username DB
// // export function nameChangeReq(url: string, by: string) {
// //     usernameChangeReq.insertOne({ id: url, by: by, createdAt: new Date(), active: true })
// // }
// // change password request, Inserts a active DB change password in the change_password DB
// // export function passwordChangeRequest(url: string, by: string) {
// //     passwordChangeReq.insertOne({ id: url, by: by, createdAt: new Date(), active: true })
// // }

// // creates a seesion token in DB
// export function createToken(givenuniqueId: any, GivenseesionToken: any, Givenusername: any) {
//     sessionTokenDB.insertOne({
//         "creationDate": new Date(),
//         "uniqueId": givenuniqueId,
//         "sessionToken": GivenseesionToken,
//         "username": Givenusername
//     })
// }

// // creates a user in the user DB
// export function createUser(Givenusername: any, hash: any, salt: any, customUrl: any) {
//     userDB.insertOne({ "uniqueId": crypto.randomUUID(), "username": Givenusername, "password": hash, "salt": salt, "customUrl": customUrl })
// }
// // base fucntion to create a session token
// export const rand = () => {
//     return Math.random().toString(36).substr(2);
// };
// // creates a session token with the base function
// export const randomtoken = () => {
//     return rand() + rand();
// };


// // gets information from the change_usename collection
// // export async function findUsernameChangeReq(changeId: any) {
// //     const result = await usernameChangeReq.findOne({ "id": changeId })
// //     return result
// // }

// // gets information from the change_password collection
// // export async function findPasswordChangeReq(changeId: any) {
// //     const result = await passwordChangeReq.findOne({ "id": changeId })
// //     return result
// // }

// // Updates the usename
// // export function updateUser(locatoin: any, newValues: any) {
// //     userDB.updateOne(locatoin, newValues)
// // }

// // locks the username from being able to change after it has already been change
// // export function lockUsernameLoc(locatoin: any, newValues: any) {
// //     usernameChangeReq.updateOne(locatoin, newValues)
// // }

// // locks the password from being able to change after it has already been change
// // export function lockPasswordLoc(locatoin: any, newValues: any) {
// //     passwordChangeReq.updateOne(locatoin, newValues)
// // } 