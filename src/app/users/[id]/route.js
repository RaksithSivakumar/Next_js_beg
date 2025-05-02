import { users } from '../route.js';

export async function GET(request, { params }) {
    const userId = parseInt(params.id);
    const user = users.find(user => user.id === userId);
    
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }
    
    return Response.json(user);
}