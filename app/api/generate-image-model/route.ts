import type { AIGenerateImageModelRequest } from "@/models/ai.model";
import {
  ILLUSTRATION_STATUS,
  type ImageDataFormat,
  type ImageUploaded,
} from "@/models/illustration.model";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const HEADERS_CORS = {
  "Access-Control-Allow-Origin":
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cross-Origin-Resource-Policy": "same-origin",
};

async function generateGeminiImage() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const prompt =
    "Generate an image of this baby but realistic, please take care of the details, the position, the size, the face details, the baby should be in the gestational week:";

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  console.log(response);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const { illustrationId, imageId, modelId, description, gestationalWeek } =
    (await request.json()) as AIGenerateImageModelRequest;

  try {
    // looks for the images in the database
    const { data: illustrationData, error } = await supabase
      .from("tbl_illustrations")
      .select("*")
      .eq("id", illustrationId)
      .single();

    const images: ImageDataFormat[] = illustrationData?.images || [];

    const imageToProcess = images.find(
      (image: ImageDataFormat) => image.id === imageId,
    );

    if (!imageToProcess) {
      throw new Error("Image not found");
    }

    if (imageToProcess.isFinished) {
      return NextResponse.json(
        { response: "Image already processed" },
        {
          status: 200,
          headers: HEADERS_CORS,
        },
      );
    }

    const processedImageData: ImageUploaded = {
      path: "public/demo-image-transformed.jpg",
      publicUrl: "/images/demo-image-transformed.jpg",
      fullPath: "public/demo-image-transformed.jpg",
    };

    const computedImages: ImageDataFormat[] = images.map(
      (image: ImageDataFormat) => {
        if (image.id === imageId) {
          return {
            ...image,
            isFinished: true,
            isFailed: false,
            isPending: false,
            images: {
              ...image.images,
              processed: processedImageData,
            },
          };
        }

        return image;
      },
    );

    const isStatusCompleted = computedImages.every((image) => image.isFinished);

    // update the images in the database
    const { error: updateError } = await supabase
      .from("tbl_illustrations")
      .update({
        images: computedImages,
        process_status: isStatusCompleted
          ? ILLUSTRATION_STATUS.COMPLETED
          : ILLUSTRATION_STATUS.PROCESSING,
      })
      .eq("id", illustrationId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json(
      { response: "Images updated successfully" },
      {
        status: 200,
        headers: HEADERS_CORS,
      },
    );
    // console.log("imageToProcess:", imageToProcess);

    // const imageToProcess: ImageUploaded = images.find(
    //   (image: ImageUploaded) => image.id === imageId,
    // );

    // console.log("imageToProcess:", imageToProcess);

    // const { id, path, publicUrl } = imageToProcess;

    // // grab image file from path supabase storage
    // const { data: imageData, error: imageError } = await supabase.storage
    //   .from("unprocessed_images")
    //   .download(path);

    // console.log("imageData:", imageData);

    // const newImageInfo = {
    //   id,
    //   path: '',
    //   publicUrl: '',
    //   fullPath: '',
    // }

    // if (imageError) {
    //   throw new Error(imageError.message);
    // }
  } catch (error) {
    return NextResponse.json(
      { response: "Error: " + error },
      {
        status: 500,
        headers: HEADERS_CORS,
      },
    );
  }
}
