// app/api/v2.0/route.ts

import Database from "@/DB/v2.0";
import { NextResponse } from "next/server";

const userDb = new Database("users");

// Ensure database and schema are set up
(async () => {
    await userDb.init({ name: 'string', email: 'string', age: 'number' });
})();

export async function GET(req) {
    try {
        const { id } = req.nextUrl.searchParams; // Access query parameter 'id' using searchParams

        if (id) {
            // Fetch user by ID
            const user = await userDb.fetchInstanceById(parseInt(id, 10));
            if (!user) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(user, { status: 200 });
        } else {
            // Fetch all users
            const users = await userDb.fetchAll();
            return NextResponse.json(users, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newUser = await userDb.addInstance(body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id } = req.nextUrl.searchParams; // Access query parameter 'id' using searchParams
        const body = await req.json();
        const updatedUser = await userDb.updateInstanceById(parseInt(id, 10), body);
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = req.nextUrl.searchParams; // Access query parameter 'id' using searchParams
        await userDb.deleteInstanceById(parseInt(id, 10));
        return NextResponse.json({ message: `User with ID ${id} deleted` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
    }
}
