"use client";

import { useState, useRef } from "react";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const generatedTextRef = useRef("");

  // Function to highlight important parts of the text
  const highlightImportantText = (text) => {
    // This regex matches patterns that typically indicate important information
    const importantPatterns = [
      // Matches key conclusions (e.g., "Therefore", "In conclusion")
      /(?:therefore|thus|in conclusion|as a result|consequently|importantly|key takeaway|crucially|significantly)[^.!?]*[.!?]/gi,
      // Matches definitions (e.g., "X is defined as Y")
      /(\b\w+\b) is (?:defined as|known as|referred to as) (\b[\w\s]+\b)/gi,
      // Matches numbered lists or key points
      /(\d+\.\s+[^.!?]*[.!?])/g,
      // Matches names, proper nouns, and technical terms
      /(\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b)/g,
    ];

    let highlightedText = text;

    importantPatterns.forEach((pattern) => {
      highlightedText = highlightedText.replace(pattern, "<strong>$&</strong>");
    });

    return highlightedText;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
  
    setLoading(true);
    setError('');
    setGeneratedText('');
    generatedTextRef.current = '';
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `${prompt}. Format the response with clear sections and bold headings like this example:
          
          **Key Features:**
          
          1. Feature one: Description
          2. Feature two: Description
          
          **How to Use:**
          
          - Step 1: Instructions
          - Step 2: Instructions
          
          Use bold (**) for section headers and maintain clear spacing between sections.`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate text");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        generatedTextRef.current += chunk;

        // Process markdown bold (**text**) to HTML
        const processedChunk = chunk.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        setGeneratedText((prev) => prev + processedChunk);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            AI Text Generator
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-indigo-200">
            Powered by Google Gemini 1.5 Pro
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Prompt
                </label>
                <div className="mt-1">
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows={5}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    placeholder="Describe what you want to generate (e.g., 'A poem about the ocean', 'A professional email to decline a meeting')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate Text"
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {(generatedText || loading) && (
            <div className="border-t border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Generated Text
              </h2>
              <div className="prose prose-indigo max-w-none min-h-32">
                <div
                  className="whitespace-pre-wrap text-gray-800"
                  dangerouslySetInnerHTML={{ __html: generatedText }}
                />
                {loading && (
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500 ml-1"></span>
                )}
              </div>
              {generatedText && (
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        generatedText.replace(/<\/?strong>/g, "")
                      )
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      setPrompt("");
                      setGeneratedText("");
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-base text-indigo-200">
            Powered by Gemini 1.5 Pro • Important text is highlighted
          </p>
        </footer>
      </div>
    </div>
  );
}
