"use client";

import { getNotifications } from "@/actions/user";
import { getWorkSpaces } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MENU_ITEMS } from "@/constants";
import { useQueryData } from "@/hooks/useQueryData";
import { NotificationsProps, WorkspaceProps } from "@/types/index.type";
import { Menu, PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import GlobalCard from "../global-card";
import InfoBar from "../info-bar";
import Loader from "../loader";
import Modal from "../modal";
import Search from "../search";
import SidebarItem from "./sidebar-items";
import WorkspacePlaceholder from "./workspace-placeholder";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  //WIP upgrade button
  const router = useRouter();
  const pathname = usePathname();

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationsProps;
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = data as WorkspaceProps;
  const currentWorkspace = workspace.workspace.find(
    (ws) => ws.id === activeWorkspaceId
  );

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.Workspace && (
                    <SelectItem
                      key={workspace.Workspace.id}
                      value={workspace.Workspace.id}
                    >
                      {workspace.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2 transition-all">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite to Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              href={item.href}
              title={item.title}
              icon={item.icon}
              selected={pathname === item.href}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Workspaces</p>

      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No workspaces"}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    key={item.id}
                    href={`/dashboard/${item.id}`}
                    title={item.name}
                    selected={pathname === `/dashboard/${item.id}`}
                    notifications={0}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                key={item.Workspace.id}
                href={`/dashboard/${item.Workspace.id}`}
                title={item.Workspace.name}
                selected={pathname === `/dashboard/${item.Workspace.id}`}
                notifications={0}
                icon={
                  <WorkspacePlaceholder>
                    {item.Workspace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcriptions, AI summary and more."
          footer={
            <Button className="text-sm w-full mt-2">
              <Loader color="#000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        ></GlobalCard>
      )}
    </div>
  );

  return (
    <div className="w-fit h-full">
      <InfoBar />
      {/*{Sheet mobile and desktop}*/}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block   hidden h-full">{SidebarSection}</div>
    </div>
  );
};
export default Sidebar;
