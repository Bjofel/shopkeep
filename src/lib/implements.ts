import type { AuthUser, UnauthUser, adminMenu, detailVetted, details, DBExport } from "$lib/interface"
import * as database from '$lib/database'


const client = await database.connect()

//  Gateway to the main branch
const db = client.db("projekt")

// gateway to the session token
const sessionTokenDB = db.collection("Token")

// gateway to the user collectoin
const userDB = db.collection("users")

// gateway to the products database
const ProdDB = db.collection("products")



export class Management implements adminMenu {

    // creates a user
    async createUser(Givenusername: string, hash: string, salt: string, customUrl: string): Promise<boolean> {

        await userDB.insertOne({ "uniqueId": crypto.randomUUID(), "username": Givenusername, "password": hash, "salt": salt, "customUrl": customUrl })
        return true

    }

    // removes account
    async removeAcc(uniqueID: string): Promise<void> {
        await userDB.deleteOne({ "uniqueId": uniqueID })
    }

    // creaes a token
    async createToken(givenuniqueId: string, GivenseesionToken: string, Givenusername: string) {
        sessionTokenDB.insertOne({
            "creationDate": new Date(),
            "uniqueId": givenuniqueId,
            "sessionToken": GivenseesionToken,
            "username": Givenusername
        })
        return true
    }

    // removes Session token
    removeToken(token: string): void {
        sessionTokenDB.deleteOne({ "sessionToken": token })
    }

    // Find a user DOES NOT return HASHED password or salt
    async findUser(username: string): Promise<detailVetted | false> {
        const result = await userDB.findOne({ "username": username }, { projection: { password: 0, salt: 0 } })

        if (result == null) {
            return false
        } else {
            let returnage: detailVetted = {
                _id: result?._id,
                uniqueID: result?.uniqueId,
                username: result?.username,
                customUrl: result?.customUrl
            }
            return returnage
        }
    }
    // finds a user DOES return HASHED password and salt
    async findUserDetails(usename: string) {
        const result = await userDB.findOne({ "username": usename })

        if (result == null) {
            return false
        } else {
            let returnage: details = {
                _id: result?._id,
                uniqueID: result?.uniqueId,
                username: result?.username,
                customUrl: result?.customUrl,
                password: result?.password,
                salt: result?.salt,
            }
            return returnage
        }
    }
}

export class User implements AuthUser {
    // session token
    token: string
    // Who is the user
    username: string | undefined
    async getWho(): Promise<any> {
        const result = await sessionTokenDB.findOne({ "sessionToken": this.token })
        return result
    }
    // check if cookie is still valid
    async valid(): Promise<boolean> {
        const result = await sessionTokenDB.findOne({ "sessionToken": this.token })

        return Boolean(result)
    }
    // removes Session token
    removeToken(): void {
        console.log(this.token)
        sessionTokenDB.deleteOne({ "sessionToken": this.token })
    }

    async removeAcc(uniqueID: string): Promise<void> {
        await userDB.deleteOne({ "uniqueId": uniqueID })
    }

    constructor(token: string) {
        this.token = token

    }
}

export class unauthedUser implements UnauthUser {
    name: string
    pass: string

    // Checks if their is a user with this username already
    async existCheck(): Promise<{ result: any }> {
        const result = await userDB.findOne({ "username": this.name })
        return { result }
    }

    constructor(name: string, pass: string) {
        this.name = name
        this.pass = pass
    }
}

export class DBexporter implements DBExport {
    async prodList(): Promise<{
        prodName: string,
        price: string,
        desc: string,
        URL: string,
        Comments: any[]
    }[]> {
        const data = await ProdDB.find().toArray()

        let temp = data.map((myDoc) => {
            return {
                prodName: myDoc.prodName,
                price: myDoc.price,
                desc: myDoc.Desc,
                URL: myDoc.url,
                Comments: myDoc.comments
            }
        })

        return temp
    }
    async addProd(prodName: string, desc: string, price: number, url: any) {
        ProdDB.insertOne({
            "prodName": prodName,
            "Desc": desc,
            "price": price,
            "url": url,
            "comments": []
        })
    }
    updateProd(target: any, value: any) {
        ProdDB.updateOne(target, value)
    }
}
