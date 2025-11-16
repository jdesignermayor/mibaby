"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getIllustrations } from "../actions/illustration";
import { Suspense } from "react";
import ListCurrentIllustrations from "@/components/features/create-illustration/ListCurrentIllustrations";

export default function Dashboard() {

  
  return (
    <div className="flex flex-col gap-8 w-full p-5">
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
          <Card className="bg-linear-to-r from-violet-200 to-pink-200 h-[calc(20dvh)]">
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
              <ListCurrentIllustrations />
          </div>
        </div>
      </div>
    </div>
  );
}
