export default function ProductLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <h1 className="text-4xl font-bold">Product Layout</h1>
      <p className="text-lg">
        This is the product layout page. You can add more information about the product here.
      </p>
      <div className="w-full">{children}</div>
    </div>
  );
}
