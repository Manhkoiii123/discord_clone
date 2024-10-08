import ServerHeader from "@/components/server/ServerHeader";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannel = server?.channels.filter(
    (c) => c.type === ChannelType.TEXT
  );
  const audioChannel = server?.channels.filter(
    (c) => c.type === ChannelType.AUDIO
  );
  const videoChannel = server?.channels.filter(
    (c) => c.type === ChannelType.VIDEO
  );
  const members = server?.members.filter((m) => m.profileId !== profile.id);
  if (!server) {
    return redirect("/");
  }

  const role = server.members.find((m) => m.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
