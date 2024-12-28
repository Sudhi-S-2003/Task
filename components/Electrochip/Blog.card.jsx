import Image from 'next/image';

function BlogCard({ image_url, head, desc }) {
    return (
        <div className="shadow-lg border-2 w-full mx-auto">
            <div className="w-full h-[350px] overflow-hidden relative">
                <Image
                    src={image_url}
                    alt="Blog image"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{head||"Blog Title Goes Here"}</h2>
                <p className="text-gray-700 text-lg">
                    {desc || "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised"}
                </p>
            </div>
        </div>
    );
}

export default BlogCard;
