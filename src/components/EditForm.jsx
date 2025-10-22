/* ---------------- EditForm subcomponent ----------------
   Uses a mini react-hook-form instance to manage the edit form.
*/
import {useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

function EditForm({ product, onClose, onSubmit, setEditPreview, editPreview }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
    },
  });

  const selected = watch("image");
  useEffect(() => {
    if (selected && selected[0]) {
      setEditPreview(URL.createObjectURL(selected[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="text"
        {...register("name")}
        className="p-3 rounded-xl border"
        placeholder="Name"
      />
      <input
        type="number"
        {...register("price")}
        className="p-3 rounded-xl border"
        placeholder="Price"
      />
      <textarea
        {...register("description")}
        className="p-3 rounded-xl border"
        placeholder="Description"
      />
      <div className="flex gap-3 items-center">
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="p-2"
        />
        {editPreview ? (
          <img
            src={editPreview}
            alt="edit preview"
            className="w-24 h-24 object-cover rounded"
          />
        ) : (
          <img
            src={product.image || PLACEHOLDER}
            alt="current"
            className="w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl border">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white">
          Save
        </button>
      </div>
    </form>
  );
}
