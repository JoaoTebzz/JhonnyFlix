'use client';
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMovieList from "@/hooks/useMovieList";
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

  const {data: movies = []} = useMovieList();

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
      <Billboard/>
      <div className="pb-40">
      <MovieList title="Trending Now" data={movies}/>
      </div>
    </>
  );
}