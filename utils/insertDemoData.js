const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const demoCategories = [
	{ name: "speakers" },
	{ name: "trimmers" },
	{ name: "laptops" },
	{ name: "watches" },
	{ name: "headphones" },
	{ name: "juicers" },
	{ name: "earbuds" },
	{ name: "tablet-keyboards" },
	{ name: "phone-gimbals" },
	{ name: "mixer-grinders" },
	{ name: "cameras" },
	{ name: "smart-phones" },
];

const demoProducts = [
	{
		id: "1",
		title: "Smart phone",
		price: 22,
		rating: 5,
		description: "This is smart phone description",
		mainImage: "product1.webp",
		slug: "smart-phone-demo",
		manufacturer: "Samsung",
		categoryName: "smart-phones",
		inStock: 0,
	},
	{
		id: "2",
		title: "SLR camera",
		price: 24,
		rating: 0,
		description: "This is slr description",
		mainImage: "product2.webp",
		slug: "slr-camera-demo",
		manufacturer: "Canon",
		categoryName: "cameras",
		inStock: 0,
	},
	{
		id: "3",
		title: "Mixer grinder",
		price: 25,
		rating: 4,
		description: "This is mixed grinder description",
		mainImage: "product3.webp",
		slug: "mixed-grinder-demo",
		manufacturer: "ZunVolt",
		categoryName: "mixer-grinders",
		inStock: 1,
	},
	// ... add other products similarly
];

const demoProductImages = [
	{
		imageID: "1",
		productID: "1",
		image: "product1-image1.webp",
	},
	{
		imageID: "2",
		productID: "1",
		image: "product1-image2.webp",
	},
	{
		imageID: "3",
		productID: "2",
		image: "product2-image1.webp",
	},
	// ... add other images similarly
];

async function insertDemoData() {
	try {
		// 1. Upsert categories
		const categoryMap = {};
		for (const category of demoCategories) {
			const cat = await prisma.category.upsert({
				where: { name: category.name },
				update: {},
				create: { name: category.name },
			});
			categoryMap[category.name] = cat.id;
		}
		console.log("Categories inserted/verified.");

		// 2. Upsert merchant
		const merchant = await prisma.merchant.upsert({
			where: { email: "demo@merchant.com" },
			update: {},
			create: {
				name: "Demo Merchant",
				email: "demo@merchant.com",
				description: "Merchant for demo products",
				phone: "9800000000",
			},
		});
		console.log("Merchant inserted/verified.");

		// 3. Insert products
		for (const product of demoProducts) {
			await prisma.product.create({
				data: {
					id: product.id,
					title: product.title,
					price: product.price,
					rating: product.rating,
					description: product.description,
					mainImage: product.mainImage,
					slug: product.slug,
					manufacturer: product.manufacturer,
					inStock: product.inStock,
					categoryId: categoryMap[product.categoryName],
					merchantId: merchant.id,
				},
			});
		}
		console.log("Demo products inserted successfully!");

		// 4. Insert product images
		for (const image of demoProductImages) {
			await prisma.image.create({
				data: image,
			});
		}
		console.log("Demo images inserted successfully!");
	} catch (error) {
		console.error("Error inserting demo data:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Run the script
insertDemoData();
