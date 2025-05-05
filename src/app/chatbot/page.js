"use client";

import { useState, useRef } from "react";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const generatedTextRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setGeneratedText('');
    generatedTextRef.current = '';

    try {
      // Check for special commands first
      if (prompt.toLowerCase() === "help") {
        const helpResponse = `
          <div class="chatbot-output">
            <h1 class="heading text-3xl font-bold text-indigo-600">Help Section</h1>
            <h2 class="subheading text-2xl font-semibold text-indigo-500 mt-4">How to use</h2>
            <p class="text-lg">Enter your prompt to generate AI-powered text. For example:</p>
            <ul class="list-disc pl-6">
              <li class="text-lg">"Write a poem about nature"</li>
              <li class="text-lg">"Explain quantum computing in simple terms"</li>
            </ul>
            <h2 class="subheading text-2xl font-semibold text-indigo-500 mt-4">FAQ</h2>
            <ul class="list-disc pl-6">
              <li class="text-lg"><strong>Q:</strong> How does this work?<br/><strong>A:</strong> It uses Google Gemini 1.5 Pro AI model</li>
              <li class="text-lg"><strong>Q:</strong> Can I copy the results?<br/><strong>A:</strong> Yes, use the copy button below the output</li>
            </ul>
          </div>
        `;
        setGeneratedText(helpResponse);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `
${prompt}.
Please generate a thorough, well-structured response:
- Organize into clear paragraphs for readability.
- When you output **any** numbered or bulleted list, **bold the entire item number and its title** using double asterisks (e.g. **1. Title**).
- Emphasize key terms by bolding them with **double asterisks**.
- Use numbered lists for processes and bulleted lists otherwise.
- Maintain a formal, professional tone; be concise and clear.
`

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

        const processedChunk = chunk.replace(
          /\*\*(.*?)\*\*/g,
          `<strong style="color: #000; font-weight: bold;">$1</strong>`
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
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            AI Text Generator
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-indigo-200">
            Type "help" for assistance. Powered by Google Gemini 1.5 Pro
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                Your Prompt
              </label>
              <textarea
                id="prompt"
                name="prompt"
                rows={5}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder='Describe what you want to generate (e.g., "A poem about the ocean") or type "help" for assistance'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Text"
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Text</h2>
              <div className="prose prose-indigo max-w-none min-h-32">
                <div
                  className="whitespace-pre-wrap text-gray-800 [&_.heading]:text-2xl [&_.heading]:font-bold [&_.heading]:text-indigo-600 [&_.heading]:mb-4 [&_.subheading]:text-xl [&_.subheading]:font-semibold [&_.subheading]:text-indigo-500 [&_.subheading]:mt-4 [&_.subheading]:mb-2"
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
                      navigator.clipboard.writeText(generatedText.replace(/<\/?[^>]+(>|$)/g, ""))
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => {
                      setPrompt("");
                      setGeneratedText("");
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    🔄 Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
