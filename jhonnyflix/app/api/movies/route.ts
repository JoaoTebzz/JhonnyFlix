import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
    try {
       
        const fakeReq = {
            headers: Object.fromEntries(req.headers), 
        };

        await serverAuth(fakeReq as any); 

        const movies = await prismadb.movie.findMany(); 
        
        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        console.error("Erro na API de filmes:", error);
        return NextResponse.json({ error: "Erro ao buscar os filmes" }, { status: 400 });
    }
}
