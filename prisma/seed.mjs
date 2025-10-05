import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

// Product categories with relevant images
const productCategories = [
  {
    category: "Vegetables",
    items: [
      {
        name: "Organic Tomatoes",
        price: [15000, 25000],
        images: [
          "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        ],
      },
      {
        name: "Fresh Carrots",
        price: [12000, 18000],
        images: [
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
          "https://images.unsplash.com/photo-1582515073490-39981397c445?w=400",
        ],
      },
      {
        name: "Green Lettuce",
        price: [10000, 15000],
        images: [
          "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
          "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400",
        ],
      },
      {
        name: "Bell Peppers Mix",
        price: [20000, 30000],
        images: [
          "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
          "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400",
        ],
      },
      {
        name: "Fresh Spinach",
        price: [15000, 22000],
        images: [
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
        ],
      },
      {
        name: "Organic Broccoli",
        price: [18000, 28000],
        images: [
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400",
          "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=400",
        ],
      },
      {
        name: "Fresh Cabbage",
        price: [8000, 12000],
        images: [
          "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400",
          "https://images.unsplash.com/photo-1553932397-4c35e6b8101a?w=400",
        ],
      },
      {
        name: "Red Onions",
        price: [10000, 18000],
        images: [
          "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
          "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400",
        ],
      },
      {
        name: "Garlic Bulbs",
        price: [25000, 35000],
        images: [
          "https://images.unsplash.com/photo-1543339318-2e22554e2f75?w=400",
          "https://images.unsplash.com/photo-1619643380243-ffb7f5c49245?w=400",
        ],
      },
      {
        name: "Fresh Cucumber",
        price: [8000, 15000],
        images: [
          "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400",
          "https://images.unsplash.com/photo-1568584711271-ca73a9d00ca0?w=400",
        ],
      },
    ],
  },
  {
    category: "Fruits",
    items: [
      {
        name: "Sweet Mangoes",
        price: [30000, 45000],
        images: [
          "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
          "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400",
        ],
      },
      {
        name: "Fresh Bananas",
        price: [15000, 25000],
        images: [
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
          "https://images.unsplash.com/photo-1603833797131-3c0a324c9ec4?w=400",
        ],
      },
      {
        name: "Red Apples",
        price: [35000, 50000],
        images: [
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
          "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
        ],
      },
      {
        name: "Seedless Watermelon",
        price: [20000, 35000],
        images: [
          "https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=400",
          "https://images.unsplash.com/photo-1582281298055-e25b6b5f4e9d?w=400",
        ],
      },
      {
        name: "Dragon Fruit",
        price: [25000, 40000],
        images: [
          "https://images.unsplash.com/photo-1527325678964-54921661f888?w=400",
          "https://images.unsplash.com/photo-1615485736939-0e881a04d015?w=400",
        ],
      },
      {
        name: "Fresh Strawberries",
        price: [40000, 55000],
        images: [
          "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
          "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400",
        ],
      },
      {
        name: "Papaya",
        price: [18000, 30000],
        images: [
          "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400",
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400",
        ],
      },
      {
        name: "Orange Citrus",
        price: [25000, 38000],
        images: [
          "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400",
          "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400",
        ],
      },
      {
        name: "Fresh Grapes",
        price: [45000, 60000],
        images: [
          "https://images.unsplash.com/photo-1599819177466-f2d2c5c2b9c1?w=400",
          "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400",
        ],
      },
      {
        name: "Pineapple",
        price: [20000, 30000],
        images: [
          "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400",
          "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=400",
        ],
      },
    ],
  },
  {
    category: "Leafy Greens",
    items: [
      {
        name: "Kale Bundle",
        price: [18000, 28000],
        images: [
          "https://images.unsplash.com/photo-1560112173-4e1d013d3972?w=400",
          "https://images.unsplash.com/photo-1582515073490-39981397c445?w=400",
        ],
      },
      {
        name: "Bok Choy",
        price: [12000, 20000],
        images: [
          "https://images.unsplash.com/photo-1596097635451-26a5c0de3c57?w=400",
          "https://images.unsplash.com/photo-1608595527160-f99ee6d46ee6?w=400",
        ],
      },
      {
        name: "Mustard Greens",
        price: [10000, 18000],
        images: [
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400",
          "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400",
        ],
      },
      {
        name: "Swiss Chard",
        price: [15000, 25000],
        images: [
          "https://images.unsplash.com/photo-1583586964884-fa2b6e871c83?w=400",
          "https://images.unsplash.com/photo-1611579047332-e5ca0dc63ef1?w=400",
        ],
      },
      {
        name: "Arugula",
        price: [20000, 30000],
        images: [
          "https://images.unsplash.com/photo-1539127623461-9e4e2219ff23?w=400",
          "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
        ],
      },
    ],
  },
  {
    category: "Root Vegetables",
    items: [
      {
        name: "Sweet Potatoes",
        price: [12000, 20000],
        images: [
          "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400",
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        ],
      },
      {
        name: "White Potatoes",
        price: [10000, 18000],
        images: [
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
          "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
        ],
      },
      {
        name: "Fresh Ginger",
        price: [30000, 45000],
        images: [
          "https://images.unsplash.com/photo-1606783550660-8552b0d6b6f2?w=400",
          "https://images.unsplash.com/photo-1576042985896-e6c88f9e4a62?w=400",
        ],
      },
      {
        name: "Beetroot",
        price: [15000, 25000],
        images: [
          "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400",
          "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400",
        ],
      },
      {
        name: "Radish Bundle",
        price: [8000, 15000],
        images: [
          "https://images.unsplash.com/photo-1593102877072-2231e4cc98a4?w=400",
          "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=400",
        ],
      },
    ],
  },
  {
    category: "Herbs & Spices",
    items: [
      {
        name: "Fresh Basil",
        price: [8000, 15000],
        images: [
          "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400",
          "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400",
        ],
      },
      {
        name: "Cilantro Bundle",
        price: [6000, 12000],
        images: [
          "https://images.unsplash.com/photo-1613743983303-b3e89f8a7a8f?w=400",
          "https://images.unsplash.com/photo-1583554424877-5f69aac79c9a?w=400",
        ],
      },
      {
        name: "Fresh Mint",
        price: [7000, 13000],
        images: [
          "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400",
          "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
        ],
      },
      {
        name: "Parsley",
        price: [8000, 14000],
        images: [
          "https://images.unsplash.com/photo-1583554424877-5f69aac79c9a?w=400",
          "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400",
        ],
      },
      {
        name: "Chili Peppers",
        price: [20000, 35000],
        images: [
          "https://images.unsplash.com/photo-1583251541239-7b44a6e0e6e1?w=400",
          "https://images.unsplash.com/photo-1525607551550-4b012cd0229c?w=400",
        ],
      },
    ],
  },
];

// Seller data
const sellerData = [
  {
    username: "green_valley_farm",
    email: "greenvalley@example.com",
    name: "Green Valley Farm",
  },
  {
    username: "sunrise_harvest",
    email: "sunrise@example.com",
    name: "Sunrise Harvest",
  },
  {
    username: "organic_delights",
    email: "organic@example.com",
    name: "Organic Delights",
  },
  {
    username: "fresh_fields",
    email: "freshfields@example.com",
    name: "Fresh Fields",
  },
  {
    username: "nature_bounty",
    email: "naturebounty@example.com",
    name: "Nature's Bounty",
  },
  {
    username: "garden_fresh",
    email: "gardenfresh@example.com",
    name: "Garden Fresh",
  },
  {
    username: "farmer_market",
    email: "farmermarket@example.com",
    name: "Farmer's Market",
  },
];

async function main() {
  console.log("🌱 Starting seed process...");

  const sellerPassword = "seller123!";
  const hashedSellerPassword = await bcrypt.hash(sellerPassword, 10);

  // Create 7 sellers
  console.log("👨‍🌾 Creating 7 sellers...");
  const sellers = await Promise.all(
    sellerData.map((seller, index) =>
      prisma.seller.create({
        data: {
          username: seller.username,
          email: seller.email,
          password: hashedSellerPassword,
          profilePhotoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seller.username}`,
        },
      }),
    ),
  );
  console.log(`✅ Created ${sellers.length} sellers`);

  // Create 50 products distributed across sellers
  console.log("🌾 Creating 50 products...");
  const allProducts = [];
  let productCount = 0;

  // Flatten all product items
  const flatProducts = productCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category })),
  );

  // Create 50 products by cycling through the available products
  for (let i = 0; i < 50; i++) {
    const productTemplate = flatProducts[i % flatProducts.length];
    const seller = sellers[i % sellers.length]; // Distribute evenly across sellers

    const minPrice = productTemplate.price[0];
    const maxPrice = productTemplate.price[1];
    const price =
      Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    const quantity = Math.floor(Math.random() * 150) + 20; // 20-170 units

    // Add variation to product names to make them unique
    const variations = [
      "Premium",
      "Organic",
      "Fresh",
      "Local",
      "Farm",
      "Quality",
    ];
    const variation =
      i >= flatProducts.length
        ? ` ${variations[Math.floor(i / flatProducts.length) % variations.length]}`
        : "";

    const product = await prisma.product.create({
      data: {
        name: `${productTemplate.name}${variation}`.trim(),
        quantity: quantity,
        price: price,
        description: `High quality ${productTemplate.name.toLowerCase()} from ${seller.username.replace(/_/g, " ")}. ${faker.commerce.productDescription()}`,
        sellerId: seller.id,
        images: {
          create: productTemplate.images.map((url, index) => ({
            imageUrl: url,
            order: index,
          })),
        },
      },
    });

    allProducts.push(product);
    productCount++;

    if (productCount % 10 === 0) {
      console.log(`  📦 Created ${productCount}/50 products...`);
    }
  }
  console.log(`✅ Created ${productCount} products`);

  // Create a test user
  console.log("👤 Creating test user...");
  const userPassword = "buyer123!";
  const user = await prisma.user.create({
    data: {
      username: "seeded_buyer",
      email: "seeded_buyer@example.com",
      password: await bcrypt.hash(userPassword, 10),
      profilePhotoUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=seeded_buyer",
      saved: { create: {} },
    },
    include: { saved: true },
  });
  console.log("✅ Created test user");

  // Add some random products to user's saved items
  console.log("💾 Adding saved items...");
  const randomProducts = allProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  await prisma.savedItem.createMany({
    data: randomProducts.map((product) => ({
      savedId: user.saved.id,
      productId: product.id,
    })),
  });
  console.log("✅ Added 5 products to saved items");

  console.log("\n🎉 Seed complete!");
  console.log("\n📋 Summary:");
  console.log(`  • Sellers: ${sellers.length}`);
  console.log(`  • Products: ${productCount}`);
  console.log(`  • Users: 1`);
  console.log("\n🔐 Test Credentials:");
  console.log("\nSellers (all have same password):");
  sellers.forEach((seller) => {
    console.log(`  • Email: ${seller.email}`);
  });
  console.log(`  Password: ${sellerPassword}`);
  console.log("\nBuyer:");
  console.log(`  • Email: ${user.email}`);
  console.log(`  • Password: ${userPassword}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
