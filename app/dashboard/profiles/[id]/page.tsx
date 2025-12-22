import dynamic from "next/dynamic";

const DynamicProfileDetail = dynamic(
  () => import("@/components/features/profiles/ProfileDetail"),
  {
    ssr: true,
  },
);

export default function ProfileDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <div>
        <h1>Perfil</h1>
      </div>
      <div>
        <DynamicProfileDetail />
      </div>
    </div>
  );
}
