export default async function ImagesProcessor({ images }) {
  const processed = [];

  for (const img of images) {
    // simular procesamiento lento del lado del servidor
    const url = await new Promise<string>((resolve) =>
      setTimeout(() => resolve("/images/demo-image-transformed.jpg"), 3000),
    );

    processed.push({
      id: img.id,
      base: img.publicUrl,
      converted: url,
    });
  }

  return <ProcessedImagesClient images={processed} />;
}
