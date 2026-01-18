import { connectToDatabase } from '@/lib/db';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    error: 'Email and password required.',
                },
                {
                    status: 400,
                }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already registerd' },
                { status: 400 }
            );
        }

        await User.create({
            email,
            password,
        });

        return NextResponse.json(
            { message: 'User registerd successfully' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Registration error', error);
        return NextResponse.json(
            { message: 'Failed to register user' },
            { status: 400 }
        );
    }
}
