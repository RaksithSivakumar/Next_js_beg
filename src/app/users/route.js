// Initialize users array
const users = [
    { id: 1, name: 'John Doe', email: 'abc01@gmail.com' },
    { id: 2, name: 'Jane Smith', email: 'cba02@gmail.com' },
];

// Export the array
export { users };

// GET all users
export async function GET() {
    return Response.json(users);
}

// POST new user
export async function POST(request) {
    const userData = await request.json();
    if (!userData.name) {
        return Response.json({ error: "Name is required" }, { status: 400 });
    }
    const newUser = {
        id: users.length + 1,
        name: userData.name
    };
    users.push(newUser);
    return Response.json(newUser, { status: 201 });
}