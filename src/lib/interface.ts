export interface AuthUser {
    token: string // their session token
    getWho(): void // gets person from database
    valid(): Promise<boolean> // checks if token still is valid
    removeToken(): void // Deletes token
    removeAcc(uniqueID: string): Promise<void> // deletes Acc

}

export interface UnauthUser {
    name: string
    pass: string
    existCheck(): Promise<{ result: any }>

}

export interface adminMenu {
    createUser(Givenusername: string, hash: string, salt: string, customUrl: string): Promise<boolean>
    createToken(givenuniqueId: string, GivenseesionToken: string, Givenusername: string): Promise<boolean>
    findUser(username: string): Promise<detailVetted | false>
}

// excludes infor such as password and salt
export interface detailVetted {
    _id: object
    uniqueID: string
    username: string
    customUrl: string
}

// has info such as password and salt aswell as the details from detailvetted
export interface details extends detailVetted {
    password: string
    salt: string
}

// DB information collector for the products
export interface DBExport {
    prodList(): any // get all prods

}