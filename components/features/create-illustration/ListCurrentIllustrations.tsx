"use client";

export default function ListCurrentIllustrations() {
  return (
    <div>
      <div className="flex gap-3 w-[78dvw] overflow-y-scroll">
        {/* {illustrations?.map((item: Illustration, index: number) => (
          <div className="grid gap-3" key={index}>
            <Card
              key={index}
              className=" xl:w-80 w-70 h-40 xl:h-70 bg-gray-100 relative overflow-hidden rounded-lg text-white border-none"
            >
              <CardContent className="w-full h-full flex justify-center items-center ">
                <Image
                  className="w-full h-full object-cover"
                  src={
                    item.avatar_picture?.base64 ||
                    "https://i.imgflip.com/1o0ska.jpg?a489600"
                  }
                  alt="Card Image"
                  width={500}
                  height={500}
                />
              </CardContent>
            </Card>
            <div>
              <p className="font-bold">Bebebe de johana</p>
              <p className=" text-gray-500">sadasdasdsadasdasdasd </p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
