import Link from "next/link";
import Image from "next/image"; // Import Image component
import { ClipLoader } from "react-spinners";

export default function Home() {
  const gallery = [
    {
      _id: 1,
      title: "Spider Man",
      imageUrl: "/img1.jpeg", // Corrected path
    },
    {
      _id: 2,
      title: "Spider Man",
      imageUrl: "/img2.jpeg",
    },
    {
      _id: 3,
      title: "Spider Man",
      imageUrl: "/img3.jpeg",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {gallery.length === 0 ? (
        <div className="flex items-center justify-center min-h-[750px]">
          <ClipLoader color="#ef4444" size={120} />
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {gallery.map((item) => (
            <Link
              href={`/gallery/${item._id}`}
              key={item._id}
              className="relative mb-4 group"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
              <span className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
