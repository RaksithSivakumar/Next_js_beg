export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-4xl font-bold">Loading...</h1>
            <p className="text-lg">Please wait while we fetch the data.</p>
        </div>
    );
}