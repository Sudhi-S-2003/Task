// app/api/DB_STORE/db/[dbName]/route.js

import { fetchAll, createDb } from "@/DB/index";

// GET handler
export async function GET(req) {
    const { pathname } = req.nextUrl;
    const dbName = pathname.split('/')[4];

    if (!dbName) {
        return new Response(
            JSON.stringify({ error: "Database name is required." }),
            { status: 400 }
        );
    }

    try {
        const data = await fetchAll(dbName);
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}

// POST handler
export async function POST(req) {
    const { pathname } = req.nextUrl;
    const dbName = pathname.split('/')[4];


    if (!dbName) {
        return new Response(
            JSON.stringify({ error: "Database name is required." }),
            { status: 400 }
        );
    }

    try {
        await createDb(dbName);
        return new Response(
            JSON.stringify({ message: `Database ${dbName}.json created.` }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}

// Handling unsupported methods (405 Method Not Allowed)
export function handler(req) {
    return new Response(
        JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
        { status: 405, headers: { Allow: "GET, POST" } }
    );
}
