export default function Forgot() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}