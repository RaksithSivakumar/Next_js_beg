export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
            <h1 className="text-4xl font-bold">Register</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}