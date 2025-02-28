'use client';
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth');
    },
  });

  const { data: user, isLoading, error } = useCurrentUser();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error loading user:', error);
    return <div>Error loading user data</div>;
  }

  return (
    <>
      <Navbar />
    </>
  );
}