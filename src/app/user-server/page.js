export default async function UserServer() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    const res = await fetch("https://jsonplaceholder.typicode.com/users"); 
    const users = await res.json();

    return (
        <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-4xl font-bold">Users Server</h1>
            <p className="text-lg">This is the users server page.</p>
            
            <ul className="w-full max-w-2xl space-y-4">
                {users.map((user) => (
                    <li 
                        key={user.id} 
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}