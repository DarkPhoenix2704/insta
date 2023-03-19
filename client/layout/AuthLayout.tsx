import { HStack, VStack } from "@chakra-ui/react";
import { SideNav, TopBar } from "@app/components";

export const AuthLayout = ({ children }: DashLayoutProps) => {
  return (
    <HStack width="100%" height="100%" alignItems="flex-start">
      <SideNav />
      <VStack
        alignItems="flex-start"
        width="100%"
        style={{
          marginInlineStart: "0px",
        }}
      >
        <TopBar />
        {children}
      </VStack>
    </HStack>
  );
};

interface DashLayoutProps {
  children: React.ReactNode;
}
