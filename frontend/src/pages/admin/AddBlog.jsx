import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets, categories } from "../../assets/assert.js";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { blogAPI } from '../../api/api.js';
import toast from 'react-hot-toast';

/**
 * AddBlog (cross‑platform responsive)
 * – Mobile‑first layout with fluid spacing
 * – Adaptive grid for image/editor area on lg+
 * – Utility classes for dark‑mode friendly UI
 */
export default function AddBlog() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(assets.uploadArea);
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  /* ----------------- helpers ----------------- */
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
    // AI generation logic can be added here
    setTimeout(() => setLoadingAI(false), 1000);
  };

  const handleSave = async () => {
    const htmlContent = quillRef.current.root.innerHTML;
    
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      toast.error('Title is required');
      return;
    }
    if (!category) {
      setError('Please select a category');
      toast.error('Please select a category');
      return;
    }
    if (!imageFile) {
      setError('Please upload an image');
      toast.error('Please upload an image');
      return;
    }
    if (!htmlContent || htmlContent === '<p><br></p>') {
      setError('Please write some content');
      toast.error('Please write some content');
      return;
    }

    setError('');
    setSaving(true);

    const formData = new FormData();
    formData.append('blog', JSON.stringify({
      title,
      description: htmlContent,
      category,
      isPublished
    }));
    formData.append('image', imageFile);

    try {
      const response = await blogAPI.create(formData);
      if (response.success) {
        toast.success('Blog created successfully!');
        // Reset form
        setTitle('');
        setCategory('');
        setIsPublished(false);
        setImageFile(null);
        setImagePreview(assets.uploadArea);
        quillRef.current.root.innerHTML = '';
        navigate('/admin/listBlog');
      } else {
        setError(response.message || 'Failed to create blog');
        toast.error(response.message || 'Failed to create blog');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      setError('Failed to create blog');
      toast.error('Failed to create blog');
    } finally {
      setSaving(false);
    }
  };

  /* ----------------- mount Quill ----------------- */
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Start writing…',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'direction': 'rtl' }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  /* ----------------- UI ----------------- */
  return (
    <section className="max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title"
        className="w-full border rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Grid: Image + Editor */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image upload / preview */}
        <div className="flex flex-col w-full gap-2">
          {imagePreview && (
            <div className="w-auto  aspect-video overflow-hidden rounded-md">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <label htmlFor='img' className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 text-sm  transition-colors">
          Click to select image

            <input
            id='img'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Editor */}
        <div className="w-full min-h-[300px] bg-white rounded-md border dark:border-gray-700 overflow-hidden">
          <div ref={editorRef} className="min-h-[300px]" />
        </div>
      </div>

      {/* Publish toggle */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          <label htmlFor="published" className="text-sm text-gray-500">Publish immediately</label>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="text-sm text-gray-500">Category:</label>
          <select 
            name="category" 
            id="category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.filter(c => c !== 'All').map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-start gap-4">
        <button
          onClick={handleGenerateAI}
          disabled={loadingAI}
          className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
          {loadingAI ? 'Generating…' : 'Generate with AI'}
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
          {saving ? 'Saving...' : 'Save Blog'}
        </button>
      </div>
    </section>
  );
}
