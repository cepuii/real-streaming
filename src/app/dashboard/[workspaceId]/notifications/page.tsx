"use client";

import { getNotifications } from "@/actions/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/useQueryData";
import { NotificationProps } from "@/types/index.type";
import { User } from "lucide-react";

type Props = {};

const Notifications = (props: Props) => {
  //WIP: avatar, date
  const { data } = useQueryData(["user-notifications"], getNotifications);

  const { data: notifications, status } = data as NotificationProps;

  if (status !== 200) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notifications</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.notification.map((n) => (
        <div
          key={n.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
