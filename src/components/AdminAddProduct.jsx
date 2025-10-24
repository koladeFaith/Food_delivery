import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import EditForm from "../components/EditForm";

/* ---------------- validation ---------------- */
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return value && value[0] && value[0].type.startsWith("image/");
    }),
  category: yup
    .string()
    .oneOf(["main", "salad"], "Category must be 'main' or 'salad'")
    .required("Category is required"),
});

/* ---------------- placeholder ---------------- */
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect fill='#eef2ff' width='800' height='500'/><g font-family='Arial, Helvetica, sans-serif' fill='#c7d2fe' text-anchor='middle'><text x='50%' y='50%' dy='.3em' font-size='28'>No image</text></g></svg>`
  );

/* ---------------- component ---------------- */
export default function AdminAddProduct() {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(true);

  // edit modal
  const [editing, setEditing] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  // form for add
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedImage = watch("image");

  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      const file = selectedImage[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [selectedImage]);

  // fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://food-delivery-backend-do2h.onrender.com/api/products"
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
      } catch (err) {
        console.error("Fetch products error:", err);
        toast.error("Failed to load products");
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- add product ---------------- */
  const handleAdd = async (formData) => {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("description", formData.description);
    fd.append("image", formData.image[0]);
    fd.append("category", formData.category); //  added category

    const toastId = toast.loading("Uploading product...");
    try {
      const res = await fetch(
        "https://food-delivery-backend-do2h.onrender.com/api/admin/add-product",
        { method: "POST", body: fd }
      );
      const result = await res.json();
      if (res.ok) {
        toast.success("Product added ", { id: toastId });
        setProducts((p) => [...p, result.product]);
        reset();
        setPreview(null);
      } else {
        toast.error(result.message || "Upload failed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.", { id: toastId });
    }
  };

  /* ---------------- delete ---------------- */
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this product? This action cannot be undone."
    );
    if (!ok) return;

    const promise = fetch(
      `https://food-delivery-backend-do2h.onrender.com/api/products/${id}`,
      { method: "DELETE" }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: () => {
        setProducts((p) => p.filter((x) => x._id !== id));
        return "Deleted ";
      },
      error: "Delete failed",
    });
  };

  /* ---------------- start editing ---------------- */
  const openEdit = (product) => {
    setEditing(product);
    setEditPreview(product.image || null);
  };

  /* ---------------- submit edit ---------------- */
  const handleEditSubmit = async (values) => {
    if (!editing) return;
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("price", values.price);
    fd.append("description", values.description);
    fd.append("category", values.category); // added category to edit too
    if (values.image && values.image[0]) fd.append("image", values.image[0]);

    const toastId = toast.loading("Updating product...");
    try {
      const res = await fetch(
        `https://food-delivery-backend-do2h.onrender.com/api/products/${editing._id}`,
        { method: "PUT", body: fd }
      );
      const result = await res.json();
      if (res.ok) {
        toast.success("Product updated ", { id: toastId });
        setProducts((prev) =>
          prev.map((p) => (p._id === editing._id ? result.product : p))
        );
        setEditing(null);
        setEditPreview(null);
      } else {
        toast.error(result.message || "Update failed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.", { id: toastId });
    }
  }; 

  const makeImageProps = (src) => {
    const fullSrc = src
      ? src.startsWith("http")
        ? src
        : `https://food-delivery-backend-do2h.onrender.com/${src}`
      : PLACEHOLDER;

    return {
      src: fullSrc,
      onError: (e) => {
        e.currentTarget.src = PLACEHOLDER;
      },
    };
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 flex flex-col items-center py-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          Admin — Add Product
        </h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, iure
        nulla! Totam tenetur quia quidem, dolorum iusto placeat, delectus
        deserunt qui ipsam doloribus odio eveniet modi alias inventore iste!
        Repellendus.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Ex, iure nulla! Totam tenetur quia quidem, dolorum iusto placeat,
        delectus deserunt qui ipsam doloribus odio eveniet modi alias inventore
        iste! Repellendus.
        <form
          onSubmit={handleSubmit(handleAdd)}
          className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Product name"
              {...register("name")}
              className="p-3 rounded-xl border focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="number"
              placeholder="Price"
              {...register("price")}
              className="p-3 rounded-xl border focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <textarea
            placeholder="Description"
            {...register("description")}
            className="p-3 rounded-xl border focus:ring-2 focus:ring-indigo-300"
          />

          {/*  Added Category */}
          <select
            {...register("category")}
            className="p-3 rounded-xl border focus:ring-2 focus:ring-indigo-300 w-full"
            defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            <option value="main">Main</option>
            <option value="salad">Salad</option>
          </select>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="p-2 rounded-xl border w-full sm:w-auto"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow w-full sm:w-auto">
              Add product
            </button>
          </div>
        </form>
      </div>

      {/* Loading */}
      {loadingFetch ? (
        <div className="flex flex-col items-center mt-12">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-indigo-600 mt-2">Loading products...</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border">
                  <div className="relative">
                    <img
                      {...makeImageProps(p.image)}
                      alt={p.name}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute right-2 top-2 flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-white/50 hover:bg-white px-2 py-1 rounded-md text-sm shadow">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-sm shadow">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    <p className="text-indigo-600 font-medium text-[14px]">
                      ${p.price}
                    </p>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div
              initial={{ y: 30, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-3">Edit Product</h3>

              <EditForm
                product={editing}
                onClose={() => {
                  setEditing(null);
                  setEditPreview(null);
                }}
                onSubmit={handleEditSubmit}
                setEditPreview={setEditPreview}
                editPreview={editPreview}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
