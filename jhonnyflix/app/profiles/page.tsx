"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

const Profiles = () => {
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
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-5xl md?text-6xl text-center text-white">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => {router.push("/")}}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                            w-44
                            h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover:cursor-pointer
                            group-hover:border-white
                            overflow-hidden
                            ">
                                <img src="/pengu.webp" alt="Perfil"/>
                            </div>
                            <div className="mt-4 text-gray-600 text-2xl text-center group-hover:text-white">
                                {user?.name || 'User'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;