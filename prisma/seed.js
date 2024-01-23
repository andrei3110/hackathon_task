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
async function schools() {
    const school = await prisma.schools.createMany({
        data: [
            { 
                name: "school_1" ,
            },
            { 
                name: "school_2" ,
            },
            { 
                name: "school_3" ,
            },
            
        ],
        skipDuplicates: true
        }
    );
}
async function Top_places() {
    const Top_places = await prisma.Top_places.createMany({
        data: [
            { 
                title: "I" ,
            },
            { 
                title: "II" ,
            },
            { 
                title: "III" ,
            },
            
        ],
        skipDuplicates: true
        }
    );
}
schools()
Top_places()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })