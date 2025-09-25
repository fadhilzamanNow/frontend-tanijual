import { faker } from '@faker-js/faker';
import { prisma } from '@/lib/prisma';


async function main() {
// Sellers
const seller = await prisma.seller.create({
data: {
username: 'shop_alpha',
email: 'alpha@example.com',
password: 'hash',
},
})

faker.commerce.price()
// Products
const products = await prisma.$transaction(
Array.from({ length: 8 }).map(() =>
prisma.product.create({
data: {
name: faker.commerce.productName(),
quantity: faker.datatype.number({min : 5, max : 20}),
price: Number(faker.commerce.price(5,200)),
sellerId: seller.id,
},
})
)
)


// User with cart
const user = await prisma.user.create({
data: {
username: 'ilham',
email: 'ilham@example.com',
password: 'hash',
cart: { create: {} },
},
include: { cart: true },
})


// Put a couple of items into cart
await prisma.cartItem.createMany({
data: [
{ cartId: user.cart!.id, productId: products[0].id, quantity: 2, unitPrice: products[0].price },
{ cartId: user.cart!.id, productId: products[1].id, quantity: 1, unitPrice: products[1].price },
],
})
}


main()
.then(async () => {
await prisma.$disconnect()
console.log("add")
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})