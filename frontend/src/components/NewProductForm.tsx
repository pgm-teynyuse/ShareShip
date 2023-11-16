"use client"
import { createMaterial, uploadFile } from "@/libs/queries/products";
import { fetchCategories } from "@/app/api/api";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const NewProductForm = () => {
  const router = useRouter();
const { data: session } = useSession();
console.log(session?.id);

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [available, setAvailable] = useState(false); // changed to boolean
const [dayPrice, setDayPrice] = useState("");
const [category, setCategory] = useState("");
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [uploadedImageId, setUploadedImageId] = useState<string>("");

const [categories, setCategories] = useState([]);
useEffect(() => {
const loadCategories = async () => {
    const categoryData = await fetchCategories();
    if (categoryData) {
    setCategories(categoryData);
    }
};
loadCategories();
}, []);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = event.target;
if (name === "title") {
    setTitle(value);
} else if (name === "description") {
    setDescription(value);
} else if (name === "amount") {
    setAmount(value);
} else if (name === "available") {
    setAvailable(!available); // toggle boolean value
} else if (name === "dayPrice") {
    setDayPrice(value);
} else if (name === "category") {
    setCategory(value);
}
};

const uploadMedia = async (file: File): Promise<void> => {
    try {
        const response = await uploadFile(file);
        console.log("test", response);

        console.log('GraphQL Upload Response:', response);

        const imageId = response;

        if (imageId) {
            setUploadedImageId(imageId);
        } else {
            console.error('Kan ImageId niet uit de respons halen:', response);
        }
    } catch (error) {
        console.error('Fout bij het uploaden van media: ', error);
    }
};


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target as HTMLInputElement).files![0]) return;
    const file = (event.target as HTMLInputElement).files![0];
    setSelectedFile(file);
    uploadMedia(file);
};

const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!uploadedImageId) {
        console.error('Image not uploaded yet.');
        return;
    }

    const rentalProduct = {
        title,
        description,
        available,
        amount: parseInt(amount),
        dayPrice: parseInt(dayPrice),
        cover: {
            data: {
                id: uploadedImageId,
                attributes: {
                    url: "",
                },
            },
        },
        owner: {
            data: {
                id: session?.id,
                attributes: {
                    username: "",
                },
            },
        },
        category: {
            data: {
                id: category,
                attributes: {
                    name: "",
                },
            },
        },
    };

    await createMaterial(rentalProduct);
    router.push('/profile/mymaterials');
};

return (
<>
  <main className="m-4 grid grid-cols-2 gap-8 max-w-screen-xl mx-auto p-4">
    <div>
      <form>
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        Add New Material
  </h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 text-sm font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 text-sm font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            maxLength="50"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="available" className="block text-gray-600 text-sm font-semibold mb-2">
            Available
          </label>
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={available}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            style={{ backgroundColor: available ? 'rgb(14, 116, 144)' : '' }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-600 text-sm font-semibold mb-2">
            Cover Image
          </label>
          <div className="relative border-dashed border-2 border-gray-500 bg-gray-100 py-4 rounded-lg">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              {selectedFile ? (
                <p className="mt-1 text-sm text-gray-600">{selectedFile.name}</p>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mx-auto h-12 w-12 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 15l4-4 4 4m0 6H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2h-4"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop an image</p>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
    <div className="mt-12">
      <form>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 text-sm font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dayPrice" className="block text-gray-600 text-sm font-semibold mb-2">
            Day Price
          </label>
          <input
            type="number"
            id="dayPrice"
            name="dayPrice"
            value={dayPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600 text-sm font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.attributes.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-100 dark:hover-bg-cyan-700 dark:focus:ring-cyan-800"
          name="submit"
        >
          Create
        </button>
      </form>
    </div>
  </main>
</>


);

};

export default NewProductForm;
