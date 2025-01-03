// app/api/DB_STORE/db/[dbName]/[id]/route.js

import { fetchInstanceById, addInstance, deleteInstanceById } from "@/DB/index";

// Utility function to parse JSON body for POST requests
const parseBody = async (req) => {
    try {
        const body = await req.text(); // Reading the raw body as text
        return JSON.parse(body); // Parsing the raw text as JSON
    } catch (error) {
        throw new Error(`Failed to parse request body${error}`);
    }
};

// GET handler
export async function GET(req) {
    const { pathname } = req.nextUrl;
    const dbName = pathname.split('/')[4];
    const id = pathname.split('/')[5];

    try {
        const instance = await fetchInstanceById(dbName, Number(id));
        if (instance) {
            return new Response(JSON.stringify(instance), { status: 200 });
        } else {
            return new Response(
                JSON.stringify({ error: "Instance not found." }),
                { status: 404 }
            );
        }
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

    try {
        const requestBody = await parseBody(req); // Parsing the body manually
        const newInstance = await addInstance(dbName, requestBody);
        return new Response(JSON.stringify(newInstance), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}

// DELETE handler
export async function DELETE(req) {
    const { pathname } = req.nextUrl;
    const dbName = pathname.split('/')[4];
    const id = pathname.split('/')[5];

    try {
        const deletionSuccess = await deleteInstanceById(dbName, Number(id));
        if (deletionSuccess) {
            return new Response(
                JSON.stringify({ message: "Delete successful" }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Instance not found for deletion." }),
                { status: 404 }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}

// Config to disable body parser (needed for handling file uploads, etc.)
export const config = {
    api: {
      bodyParser: false,
    },
};
