"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left-aligned logo/brand (optional) */}
          <div className="flex-shrink-0">
            {/* Add your logo here if needed */}
          </div>

          {/* Centered navigation links */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex space-x-8">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  pathname === "/" ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  pathname === "/about" ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  pathname === "/contact" ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right-aligned auth buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal"/>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> {/* ✅ Proper closing tag */}
          </div>
        </div>
      </div>
    </nav>
  );
}
