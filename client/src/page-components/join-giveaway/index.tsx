'use client';
import AvatarUploader from '@/components/ui/avatar-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { swal } from '@/lib/swal';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const JoinGiveawayPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [avatar, setAvatar] = useState<File>();
  const session = useSession();

  const handleValues = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', avatar!);

      for (const key in form) {
        formData.append(key, form[key]);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL}/user`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await swal('Pronto! Você está participando do sorteio!', 'success');
        if (result) {
          router.push('/');
        }
      }

      if ((await response.json()).error?.includes('email')) {
        await swal('Você já está participando do sorteio!', 'error');
      }
    } catch (error: any) {
      await swal(error.message, 'error');
    }
  };

  async function urlToFile(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    return file;
  }

  useEffect(() => {
    urlToFile(session.data?.user?.image).then((file) => {
      setAvatar(file);
      setForm({
        name: session.data?.user?.name,
        email: session.data?.user?.email,
      });
    });
  }, [session]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
    >
      <div className="h-screen bg-slate-800 flex items-center justify-center">
        <div className="flex items-center max-w-sm w-full h-full ">
          <div className="flex flex-col justify-start items-center gap-5 w-full h-[480px]">
            {session.status == 'authenticated' ? (
              <>
                <h2>Signed in as {session?.data?.user?.name}</h2>
                <Button type="button" className="bg-slate-300 w-48" onClick={() => signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button type="button" className="bg-slate-300 w-48" onClick={() => signIn()}>
                Login With Google
              </Button>
            )}
            <div className="flex justify-center items-center w-full">
              <AvatarUploader handleAvatarChange={handleAvatarChange} value={avatar} />
            </div>
            <Input name="email" value={form && form['email']} type="email" placeholder="Email" onChange={handleValues} readOnly />
            <Input name="name" value={form && form['name']} type="text" placeholder="Nome Completo" onChange={handleValues} readOnly />
            <Button className="bg-slate-300 w-48" type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default JoinGiveawayPage;
