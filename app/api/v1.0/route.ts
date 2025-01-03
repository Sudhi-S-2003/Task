import { NextResponse } from 'next/server';
import { createDb, fetchAll, fetchInstanceById, addInstance, updateInstanceById, deleteInstanceById } from '@/DB/v1.0';

const dbName = 'users';

// Ensure the database is created (if not already done)
(async () => {
    await createDb(dbName, { name: 'string', email: 'string', age: 'number' });
})();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url); // Get the request URL
        const id = url.searchParams.get('id'); // Extract the 'id' query parameter

        if (id) {
            // Fetch user by ID
            const user = await fetchInstanceById(dbName, parseInt(id, 10));
            if (!user) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(user, { status: 200 });
        } else {
            // Fetch all users
            const users = await fetchAll(dbName);
            return NextResponse.json(users, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newUser = await addInstance(dbName, body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url); // Get the request URL
        const id = url.searchParams.get('id'); // Extract the 'id' query parameter
        if (!id) {
            return NextResponse.json({ message: 'ID is required to update a user' }, { status: 400 });
        }

        const body = await req.json();
        const updatedUser = await updateInstanceById(dbName, parseInt(id, 10), body);
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url); // Get the request URL
        const id = url.searchParams.get('id'); // Extract the 'id' query parameter
        if (!id) {
            return NextResponse.json({ message: 'ID is required to delete a user' }, { status: 400 });
        }

        await deleteInstanceById(dbName, parseInt(id, 10));
        return NextResponse.json({ message: `User with ID ${id} deleted` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
    }
}
