// components/PopupSettingsForm.jsx
"use client";

import { useState, useTransition } from "react";
import { updatePopupSettings, uploadPopupImage, deletePopupImage } from "@/app/lib/actions";
import Image from "next/image";

export default function PopupSettingsForm({ popup }) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'
  const [isPending, startTransition] = useTransition();
  const [selectedType, setSelectedType] = useState(popup?.type || "content");
  const [imagePreview, setImagePreview] = useState(popup?.image_url || null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(popup?.image_url || null);
  const [isUploading, setIsUploading] = useState(false);
  const [contentValue, setContentValue] = useState(popup?.content || ""); // Preserve content

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setMessage("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (500KB max)
    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      setMessage("File size must be less than 500KB");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPEG, PNG, WEBP, and GIF images are allowed");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image immediately
    setIsUploading(true);
    setMessage("Uploading image...");
    setMessageType("success");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPopupImage(formData);

      if (result.success) {
        setUploadedImageUrl(result.url);
        setMessage("Image uploaded successfully! Don't forget to save changes.");
        setMessageType("success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setMessage("Upload failed: " + error.message);
      setMessageType("error");
      setImagePreview(null);
      e.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!uploadedImageUrl) return;

    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    setIsUploading(true);
    try {
      await deletePopupImage(uploadedImageUrl);
      setImagePreview(null);
      setUploadedImageUrl(null);
      setMessage("Image deleted successfully");
      setMessageType("success");

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setMessage("Delete failed: " + error.message);
      setMessageType("error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submit
    if (selectedType === "image" && !uploadedImageUrl) {
      setMessage("Please upload an image first");
      setMessageType("error");
      return;
    }

    const formData = new FormData(e.target);

    // Add the uploaded image URL if type is image
    if (selectedType === "image") {
      formData.set("image_url", uploadedImageUrl);
    }

    // Add old image URL for cleanup
    if (popup?.image_url) {
      formData.set("old_image_url", popup.image_url);
    }

    startTransition(async () => {
      try {
        const result = await updatePopupSettings(formData);
        setMessage(result.message);
        setMessageType("success");
      } catch (error) {
        setMessage("Update failed: " + error.message);
        setMessageType("error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" defaultValue={popup ? popup.id : ""} />

      {/* Type Selection */}
      <div className="space-y-3">
        <label className="block font-medium text-gray-300 text-lg">Popup Type</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="type"
              value="content"
              checked={selectedType === "content"}
              onChange={handleTypeChange}
              className="form-radio h-5 w-5 text-rose-500 focus:ring-rose-500"
            />
            <span className="ml-3 text-gray-300 text-base">Text Content</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="type"
              value="image"
              checked={selectedType === "image"}
              onChange={handleTypeChange}
              className="form-radio h-5 w-5 text-rose-500 focus:ring-rose-500"
            />
            <span className="ml-3 text-gray-300 text-base">Image Only</span>
          </label>
        </div>
      </div>

      {/* Conditional Content Based on Type */}
      {selectedType === "content" ? (
        <div>
          <label className="block font-medium text-gray-300 mb-2">Popup Content</label>
          <textarea
            name="content"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg h-[45vh] border border-gray-700 focus:border-rose-500 focus:outline-none"
            rows="4"
            placeholder="Enter your popup content here..."
          ></textarea>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block font-medium text-gray-300">Popup Image</label>

          {/* Image Upload */}
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={isUploading}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-rose-500 file:text-white
                hover:file:bg-rose-600
                file:cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-sm text-gray-400">
              Maximum file size: 500KB. Supported formats: JPEG, PNG, WEBP, GIF
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative border border-gray-700 rounded-lg p-4 bg-gray-800">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-gray-300">Preview:</p>
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  disabled={isUploading}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded disabled:opacity-50"
                >
                  Delete Image
                </button>
              </div>
              <div className="relative w-full max-w-2xl mx-auto">
                <Image
                  src={imagePreview}
                  alt="Popup Preview"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Checkbox */}
      <div className="pt-4 border-t border-gray-700">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="active"
            defaultChecked={popup ? popup.active : false}
            className="form-checkbox h-5 w-5 text-rose-500 focus:ring-rose-500 rounded"
          />
          <span className="ml-3 text-gray-300 text-base">Enable Popup (Show on homepage)</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>

        {message && (
          <div className={`flex-1 p-3 rounded-lg ${
            messageType === "error"
              ? "bg-red-900/30 text-red-400 border border-red-700"
              : "bg-green-900/30 text-green-400 border border-green-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
