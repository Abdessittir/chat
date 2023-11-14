import prisma from './db';
import crypto from 'crypto';

async function seed() {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2('123456', salt, 310000, 32, 'sha256', async (err, hashed_password) => {
        try {
            const users = await prisma.user.createMany({
                data: [
                    {
                        name: 'first',
                        email: 'first@gmail.com',
                        hashed_password,
                        salt
                    },
                    {
                        name: 'second',
                        email: 'second@gmail.com',
                        hashed_password,
                        salt
                    },
                    {
                        name: 'test',
                        email: 'test@gmail.com',
                        hashed_password,
                        salt
                    }
                ]
            });
        } catch(err) {
            console.log(err);
        }
        console.log('DB seeded');
    });
}

seed();
