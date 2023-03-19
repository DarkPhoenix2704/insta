import { HStack, VStack } from "@chakra-ui/react";
import { SideNav, TopBar } from "@app/components";
import { useEffect } from "react";
import { useAuth } from "@app/hooks";
import { useRouter } from "next/router";

export const AuthLayout = ({ children }: DashLayoutProps) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, []);
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
