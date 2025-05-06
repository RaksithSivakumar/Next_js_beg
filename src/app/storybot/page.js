"use client";

import { useState } from "react";

export default function StoryBotPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("fantasy");

  const generateStory = async () => {
    setLoading(true);
    setStory("");

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a ${theme} story about: ${prompt}
            
            Please make sure to:
            - Create an interesting beginning, middle, and end
            - Include descriptive details about the characters and setting
            - Make the story easy to read but exciting
            - Keep it between 300-500 words
            - Add some dialogue between characters
            - Include one surprising moment`,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setStory(`Error: ${error}`);
      } else {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setStory((prev) => prev + decoder.decode(value, { stream: true }));
        }
      }
    } catch (err) {
      setStory(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-100 sm:text-4xl sm:tracking-tight lg:text-6xl">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
              Midnight Storyteller
            </span>
          </h1>
          <p className="mt-3 p-4 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Unleash your imagination under the moonlight and let AI craft
            captivating stories for you
          </p>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 mb-8 border border-gray-700">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Story Theme
              </label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-gray-100 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border"
              >
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Your Story Prompt
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="prompt"
                  placeholder="A brave knight discovers a dragon's secret..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-600 rounded-lg border"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={generateStory}
                disabled={loading || !prompt.trim()}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white ${
                  loading || !prompt.trim()
                    ? "bg-indigo-800 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
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
                    Weaving Your Tale...
                  </>
                ) : (
                  <>
                    <svg
                      className="-ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Craft My Story...
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {story && (
          <div className="bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-8 w-8 text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg leading-6 font-bold text-gray-100">
                    Your Generated Story
                  </h3>
                </div>
              </div>
              <div
                className="prose prose-invert max-w-none text-gray-300 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-700 hover:scrollbar-thumb-indigo-400">
                <p className="whitespace-pre-wrap px-1">{story}</p>
              </div>
            </div>
            <div className="bg-gray-700 px-6 py-4 sm:px-8">
              <div className="flex justify-end">
                <button
                  onClick={() => navigator.clipboard.writeText(story)}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
                  Copy Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
