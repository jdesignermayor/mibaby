"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid gap-4">
        <div>
          <h1 className="font-bold text-2xl bg-linear-to-r from-indigo-500 via-violet-600 to-blue-500 bg-clip-text text-transparent">
            Your first impression of the baby coming soon
          </h1>
          <p>
            Here you can see your recent illustrations, filter by date, type,
            etc.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <Card className="bg-linear-to-r from-violet-200 to-pink-200 h-[calc(25dvh)]">
            <CardContent></CardContent>
          </Card>
        </div>
        <div className="flex gap-5">
          <div>
            <Button
              variant={"ghost"}
              className="bg-linear-to-r from-violet-200 to-pink-200 h-[calc(8dvh)] w-[calc(15dvh)] cursor-pointer hover:ring-2 "
            >
              <p>Create illustration</p>
            </Button>
          </div>
          <div>
            <Button
              variant={"ghost"}
              className="bg-linear-to-r from-violet-200 to-pink-200 h-[calc(8dvh)] w-[calc(15dvh)] cursor-pointer hover:ring-2 "
            >
              <p>Create Profile</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <h3 className=" text-2xl font-bold">Recent illustrations</h3>
          <p>
            Here you can see your recent illustrations, filter by date, type,
            etc.
          </p>
        </div>
        <div>
          <div className="flex gap-6">
            <div className="grid gap-3">
              <Card className="w-100 h-72 bg-gray-100 relative overflow-hidden rounded-lg text-white border-none">
                <CardContent className="w-full h-full flex justify-center items-center ">
                  <Image
                    src="https://www.centroginecologicolua.com/ecografias-5d-ve-a-tu-bebe-antes-de-nacer_img19071t1.jpg"
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
            <div className="grid gap-3">
              <Card className="w-100 h-72 bg-gray-100 relative overflow-hidden rounded-lg text-white border-none">
                <CardContent className="w-full h-full flex justify-center items-center ">
                  <Image
                    src="https://www.centroginecologicolua.com/ecografias-5d-ve-a-tu-bebe-antes-de-nacer_img19071t1.jpg"
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
          </div>
        </div>
      </div>
    </div>
  );
}
