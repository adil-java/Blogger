import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/build/jodit.min.css';

export default function AddBlog() {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    toolbarAdaptive: false,
  }), []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleGenerateAI = async () => {
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
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title"
        className="w-full border rounded p-2"
      />

      <div>
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="h-40 object-cover mb-2 rounded" />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
      />

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label htmlFor="published">Publish</label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGenerateAI}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          disabled={loadingAI}
        >
          {loadingAI ? 'Generating...' : 'Generate with AI'}
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}
