"use client";
import { useState } from 'react';
import { processSummarization } from './actions';
import ReactMarkdown from 'react-markdown';


import remarkGfm from 'remark-gfm';

export default function Home() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('general');
  const [summary, setSummary] = useState('');

  const [loading, setLoading] = useState(false);

const handleSummarize = async () => {
  setLoading(true); // Start loading
  try {
    const result = await processSummarization(text, mode);
    setSummary(result.summary || '');
  } finally {
    setLoading(false); 
  }
};
const copyToClipboard = () => {
  navigator.clipboard.writeText(summary);
  alert("Summary copied to clipboard!");
};
    return (

      <main className="p-8">
    {/* Header Section */}
    <header className="app-header">
  <h1 className="app-title">Smart Summarizer</h1>
  <div className="contributor-info">
    <p><span className="font-bold text-gray-700">Team:</span> Cipher</p>
    <p><span className="font-bold text-gray-700">Contributors:</span> Vanshika Tyagi, Ria Saraswat</p>
  </div>
</header>
  
    <textarea 
      value={text} 
      onChange={(e) => setText(e.target.value)} 
      placeholder="Paste text here..." 
      className="w-full p-2 border rounded" 
      rows={8}
    />
    
    <select 
      value={mode} 
      onChange={(e) => setMode(e.target.value)}
      className="my-4 p-2 border rounded"
    >
      <option value="general">General</option>
      <option value="meeting">Meeting Minutes</option>
      <option value="article">Article/Blog</option>
      <option value="code">Code Review</option>
    </select>

    <button 
      onClick={handleSummarize} 
      disabled={loading}
      className={`ml-4 px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
    >
      {loading ? "Generating..." : "Generate Summary"}
    </button>

    {/* Only show the Copy button if a summary exists */}
    {summary && (
      <div className="mt-4">
        <button 
          onClick={copyToClipboard}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          📋 Copy to Clipboard
        </button>
      </div>
    )}

    <div className="summary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {summary}
      </ReactMarkdown>
    </div>
  </main>
);
}
