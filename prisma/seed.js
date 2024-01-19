const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function user() {
    const user = await prisma.user.createMany({
        data: [
            { 
                name: "Admin" ,
                password:"$2b$10$X5bw0Vmv2wisEoeU8dzUaOKFZl8Hq6eNmVeBixU8uWSSiuF9ryMt.",
                email:"admin@example.com",
                role:"Admin"
               
            },
            
        ],
        skipDuplicates: true
        }
    );
}
async function category() {
    const category = await prisma.category.createMany({
        data: [
            { 
                title: "category1" ,
            },
            { 
                title: "category2" ,
            },
            { 
                title: "category3" ,
            },
            
        ],
        skipDuplicates: true
        }
    );
}
category()
user()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })