import type { Illustration } from "@/models/illustration.model";

export default function CreateIllustrationDeliveryStep({
  illustrationData,
}: {
  illustrationData: Illustration;
}) {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div className="grid gap-3 ">
          <div className="flex gap-3 w-full">
            <div className="flex gap-2">
              {/* <ImageSelectorCard uploadedImages={processedImages} /> */}
              {/* <Suspense fallback={<div>Procesando imágenes una por una…</div>}>
                <ImagesProcessor images={images} />
              </Suspense> */}
            </div>
            <div className="flex flex-col gap-3 w-[calc(60dvw)] xl:w-[calc(42dvw)] ">
              {/* <ViewModePanel /> */}

              {/* <ImgComparisonSlider className=" rounded-xl  inset-0 bg-linear-to-r from-white to-transparent ">
                <Image
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                  loading="eager"
                  priority={true}
                  alt="Demo image basic"
                  slot="first"
                  className="object-cover w-[calc(58dvw)] h-[calc(20dvh)]"
                  src="/images/demo-image-basic.jpg"
                />
                <Image
                  width={500}
                  height={500}
                  objectFit="cover"
                  layout="responsive"
                  alt="Demo image transformed"
                  slot="second"
                  className="w-full h-full object-cover"
                  src="/images/demo-image-transformed.jpg"
                />
              </ImgComparisonSlider> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
