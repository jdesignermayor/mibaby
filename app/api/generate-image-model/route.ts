import type {
  AIGenerateImageModelRequest,
  AIShemaModelPrice,
} from "@/models/ai.model";
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

async function generateGeminiImage({ imageBlob }: { imageBlob: ArrayBuffer }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_APY_KEY,
    // 3. Configuración técnica de la respuesta
  });

  const prompt = [
    {
      text: "generate random baby image",
    },
    {
      inlineData: {
        mimeType: "image/png",
        data: Buffer.from(imageBlob).toString("base64"),
      },
    },
  ];
}

export async function POST(request: Request) {
  const supabase = await createClient();

  async function insertModelExpense() {
    // get model prices from the database by
    try {
      const { data: models, error: modelsError } = await supabase
        .from("tbl_models")
        .select("*")
        .in("id", [2, 3]);

      if (modelsError) {
        return NextResponse.json(
          { response: "Error getting models" },
          {
            status: 500,
            headers: HEADERS_CORS,
          },
        );
      }

      const [modelInput, modelOutput]: AIShemaModelPrice[] = models;

      console.log("insert model expense:", modelInput);
      await supabase.from("tbl_expense_model_history").upsert([
        {
          illustration_id: illustrationId,
          model_id: modelInput.id,
          tokens: modelInput.tokens_per_generation,
          type: "input",
          price: modelInput.price_per_token_generation,
        },
      ]);
    } catch (error) {
      return NextResponse.json(
        { response: "Error inserting model expense" },
        {
          status: 500,
          headers: HEADERS_CORS,
        },
      );
    }
  }

  const { illustrationId, imageId, modelId, description, gestationalWeek } =
    (await request.json()) as AIGenerateImageModelRequest;

  try {
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

    const { id, images: imagesProcess } = imageToProcess;
    const {
      unprocessed: { path },
    } = imagesProcess;

    console.log("path:", path);

    await insertModelExpense();

    // grab image file from path supabase storage
    // const { data: imageData, error: imageError } = await supabase.storage
    //   .from("unprocessed_images")
    //   .download(path);

    // if (imageData) {
    //   const imageBlob = await imageData.arrayBuffer();
    //   // await generateGeminiImage({ imageBlob: imageBlob });
    // }

    // if (imageError) {
    //   throw new Error(imageError.message);
    // }

    return NextResponse.json(
      { response: "Images updated successfully" },
      {
        status: 200,
        headers: HEADERS_CORS,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { response: "Error generating image, please try again later." },
      {
        status: 500,
        headers: HEADERS_CORS,
      },
    );
  }
}
