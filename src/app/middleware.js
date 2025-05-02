import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes
const protectedRoutes = [
  '/mock-users'
];

// Create a route matcher for protected routes
const isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware(async (auth, req) => {
  // Log the request URL for debugging
  console.log('Incoming request URL:', req.url);

  // Check if the route is protected
  if (isProtectedRoute(req)) {
    console.log('Protected route accessed:', req.url);
    try {
      await auth().protect(); // Enforce authentication for protected routes
    } catch (error) {
      console.error('Error protecting route:', error);
    }
  } else {
    console.log('Public route accessed:', req.url);
  }
});

export const config = {
  matcher: [
    // Match all routes except static files, internals, and assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always match API routes
    '/(api|trpc)(.*)',
  ],
};