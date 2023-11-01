import { server } from './app';
import prisma from './prisma/db';

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log('users', allUsers)
}

const port = process.env.PORT ?? 8080
server.listen(8080, () => {
  console.log(`server running at http://localhost:${port}`);
});
