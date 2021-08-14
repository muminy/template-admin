export default function FileUpload({ props }) {
  return (
    <>
      <label className="border border-dashed w-full block py-4" htmlFor="bg_image">
        Resim Ekle
      </label>
      <input {...props} className="hidden" id="bg_image" type="file" />
    </>
  );
}

export const LabelOfUpload = ({ editable }) => {
  return (
    <label className="label-of-file-upload" htmlFor="bg_image">
      {editable ? (
        "Yeni resim seç"
      ) : (
        <>
          <div className="font-semibold mb-4  text-gray-600">
            PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
          </div>
          <div
            role="button"
            className="px-6 py-2 inline hover:bg-gray-300 text-gray-800 bg-gray-200 rounded-md font-semibold"
          >
            Resim seç
          </div>
        </>
      )}
    </label>
  );
};
