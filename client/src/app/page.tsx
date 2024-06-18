import GiveawayPage from '@/page-components/giveaway';

async function getUsers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL}/user`, {
      cache: 'no-cache',
    });
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main>
      <GiveawayPage users={users} />
    </main>
  );
}
