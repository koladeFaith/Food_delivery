import { useForm } from "react-hook-form";
import { useEffect } from "react";

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect fill='#eef2ff' width='800' height='500'/><g font-family='Arial, Helvetica, sans-serif' fill='#c7d2fe' text-anchor='middle'><text x='50%' y='50%' dy='.3em' font-size='28'>No image</text></g></svg>`
  );

export default function EditForm({
  product,
  onClose,
  onSubmit,
  setEditPreview,
  editPreview,
}) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category || "", // added category default
    },
  });

  const selected = watch("image");

  useEffect(() => {
    if (selected && selected[0]) {
      setEditPreview(URL.createObjectURL(selected[0]));
    }
  }, [selected, setEditPreview]);

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

      {/*  Added Category Dropdown */}
      <select
        {...register("category")}
        className="p-3 rounded-xl border"
        defaultValue={product.category || ""}>
        <option value="" disabled>
          Select category
        </option>
        <option value="main">Main</option>
        <option value="salad">Salad</option>
      </select>

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
            src={
              product.image?.startsWith("http")
                ? product.image
                : `https://food-delivery-backend-n6at.onrender.com/${product.image}`
            }
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
