import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
    try {
        const fakeReq = {
            headers: Object.fromEntries(req.headers), 
        };

        await serverAuth(fakeReq as any); 

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return NextResponse.json(randomMovies[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
