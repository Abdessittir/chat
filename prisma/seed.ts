import prisma from './db';
import crypto from 'crypto';

async function seed() {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2('123456', salt, 310000, 32, 'sha256', async (err, hashed_password) => {
        try {
            const users = [
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
            ];
            
            await prisma.user.createMany({
                data: users
            })
            // add contacts
            await prisma.user.update({
                where: {
                    id: 1
                },
                data: {
                   contacts: {
                    push: [2, 3]
                   } 
                }
            });
        } catch(err) {
            console.log(err);
        }
        console.log('DB seeded');
    });
}

seed();
