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
