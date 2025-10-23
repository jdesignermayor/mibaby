import UserGeneralMenu from "@/components/shared/UserGeneralMenu";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative h-[calc(95vh)]">
      <div className="flex ">
        <div>
          <UserGeneralMenu />
        </div>
        <div className="flex justify-center p-5 w-full ">
          <div className="flex lg:w-[calc(90%)] xl:w-[calc(90%-100px)] h-full mb-5">
            <div className="w-full pt-12">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
