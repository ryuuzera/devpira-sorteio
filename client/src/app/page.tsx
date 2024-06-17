import GiveawayPage from '@/page-components/giveaway';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import RoulettePage from '@/page-components/roulettepage';
import JoinGiveawayPage from '@/page-components/join-giveaway';

async function getUsers() {
  try {
    const res = await fetch('http://localhost:3000/api/user', {
      cache: 'no-cache',
    });
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const users = await getUsers();
  const session = await getServerSession(authOptions);
  return (
    <main>
      {/* <GiveawayPage users={users} /> */}
      {/* <RoulettePage /> */}
      <JoinGiveawayPage />
    </main>
  );
}
