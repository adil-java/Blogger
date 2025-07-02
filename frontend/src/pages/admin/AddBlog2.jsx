import React, { useState,useRef, useEffect } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { assets } from "../../assets/assert.js";


export default function AddBlog() {
    const editorRef = useRef(null)
    const FrolaRef = useRef(null)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(assets.uploadArea);
  const [isPublished, setIsPublished] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState('');
useEffect(() => {
 if(!editorRef.current && !FrolaRef.current){
    editorRef.current = new FroalaEditor(editorRef.current)
 }
}, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      setError('Title is required to generate content with AI.');
      return;
    }
    setError('');
    setLoadingAI(true);
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: title }),
      });
      const data = await res.json();
      setContent(data.html || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isPublished', isPublished);
    if (imageFile) formData.append('image', imageFile);
    await fetch('/api/blogs', { method: 'POST', body: formData });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 sm:p-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title"
        className="w-full border rounded p-2"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full max-h-60 object-cover mb-2 rounded"
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
      </div>


      <div ref={editorRef} className="border rounded">

      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label htmlFor="published">Publish</label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGenerateAI}
          className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          disabled={loadingAI}
        >
          {loadingAI ? 'Generating...' : 'Generate with AI'}
        </button>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}
