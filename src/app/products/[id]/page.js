export default function Product({ params }) {
    const { id } = params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
            <h1 className="text-4xl font-bold">Product Details</h1>
            <p className="text-lg">
                Product ID: <strong>{id}</strong>
            </p>
            <p className="text-lg">
                This is the product details page. You can add more information about the product here.
            </p>
        </div>
    );
}
