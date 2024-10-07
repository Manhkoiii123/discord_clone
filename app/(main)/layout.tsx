import NavigationSidebar from "@/components/navigation/NavigationSidebar";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="max-[768px]:hidden min-[768px]:flex z-40  h-full w-[72px] flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full ">{children}</main>
    </div>
  );
};

export default MainLayout;
