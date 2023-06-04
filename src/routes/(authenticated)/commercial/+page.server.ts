import { DBexporter } from "$lib/implements";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const productDB: DBexporter = new DBexporter()



// additional functionality avalible for the client to use
export const actions: Actions = {
    addProduct: async ({ request, locals, cookies }) => {
        const form = await request.formData();

        if (!locals.userid) {
            return fail(400, { message: "Request failed please sign in to add a product" })
        }

        let data = new Map()

        let title: string = "placeholder"
        //	 Price
        let price: number = 0
        //   Product Desc
        let desc: string = "placeholder"

        let categories: [] = []

        // Checks what kind of information been sent
        for (const [key, value] of form.entries()) {

            // checks title type and assigns it
            switch (key) {
                case "title":
                    // checks the type
                    if (typeof value === "string") {
                        // sets the title name of product
                        title = value
                    }
                    break
                case "price":
                    // checks the type
                    let x: number = Number(value)
                    if (typeof x === 'number') {
                        // sets the price of product
                        price = x
                    }
                    break
                case "desc":
                    // checks the type
                    if (typeof value === "string") {
                        // sets the desc of product
                        desc = value
                    }
                    break
                // sets categories on the product
                case "tech":
                case "tool":
                case "medicin":
                case "misc":
                    break
            }
            data.set(key, value)
        }


        if (title.length < 10) {
            return fail(302, { message: "Product name is too short" })
        }

        if (desc.length < 20) {
            return fail(302, { message: "Description is too short" })
        }

        if (price < 1) {
            return fail(302, { message: "The prefered price is too low" })
        }

        // random token gen
        function rand() {
            return Math.random().toString(36).substr(2);
        }


        // url random
        let randomURL = rand() + rand()

        // adds product to DB if everything else was sucessfull
        productDB.addProd(title, desc, price, randomURL)


    },
};