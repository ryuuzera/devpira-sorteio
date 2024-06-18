import GiveawayPage from '@/page-components/giveaway';

async function getUsers() {
  try {
    const res = await fetch('http://localhost:5000/api/v1/user', {
      cache: 'no-cache',
    });
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const users = await getUsers();
  // const session = await getServerSession(authOptions);
  return (
    <main>
      <GiveawayPage users={users} />
      {/* <RoulettePage /> */}
      {/* <JoinGiveawayPage /> */}
    </main>
  );
}
