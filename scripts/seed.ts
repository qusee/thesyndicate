// prisma/seed.ts
//import { PrismaClient } from '@prisma/client';
//import { v4 as uuidv4 } from 'uuid';


const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

function uuidv4(){
    return require('uuid').v4();
}

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            id: uuidv4(),
            username: 'john_doe',
            password: 'password123',
            profile: {
                create: {
                    id: uuidv4(),
                    imageURL: 'https://example.com/images/john_doe.png',
                    bio: 'A seasoned developer with a knack for problem-solving.',
                },
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: uuidv4(),
            username: 'jane_smith',
            password: 'password456',
            profile: {
                create: {
                    id: uuidv4(),
                    imageURL: 'https://example.com/images/jane_smith.png',
                    bio: 'A creative designer who loves to bring ideas to life.',
                },
            },
        },
    });

    // Create syndicate groups
    const syndicateGroup1 = await prisma.syndicateGroup.create({
        data: {
            id: uuidv4(),
            name: 'Project Alpha',
            createdAt: new Date(),
            expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)), // 1 week from now
            users: {
                create: [
                    {
                        userId: user1.id,
                    },
                    {
                        userId: user2.id,
                    },
                ],
            },
        },
    });

    const syndicateGroup2 = await prisma.syndicateGroup.create({
        data: {
            id: uuidv4(),
            name: 'Design Sprint',
            createdAt: new Date(),
            expiresAt: new Date(new Date().setDate(new Date().getDate() + 14)), // 2 weeks from now
            users: {
                create: [
                    {
                        userId: user2.id,
                    },
                ],
            },
        },
    });

    // Create messages
    const message1 = await prisma.message.create({
        data: {
            id: uuidv4(),
            userId: user1.id,
            groupId: syndicateGroup1.id,
            content: 'Welcome to Project Alpha! Let’s get started.',
            createdAt: new Date(),
        },
    });

    const message2 = await prisma.message.create({
        data: {
            id: uuidv4(),
            userId: user2.id,
            groupId: syndicateGroup1.id,
            content: 'Looking forward to working with everyone.',
            createdAt: new Date(),
        },
    });

    const message3 = await prisma.message.create({
        data: {
            id: uuidv4(),
            userId: user2.id,
            groupId: syndicateGroup2.id,
            content: 'Let’s brainstorm some great design ideas!',
            createdAt: new Date(),
        },
    });

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
