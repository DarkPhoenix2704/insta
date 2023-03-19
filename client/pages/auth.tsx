import { Login } from "@app/view/Auth";
import { VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Auth = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  return (
    <VStack
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {view === "login" ? <Login /> : null}
      <Text
        fontWeight="medium"
        fontFamily="Roboto"
        cursor="pointer"
        textColor="#1c336a"
        onClick={() => {
          setView((prev) => (prev === "login" ? "signup" : "login"));
        }}
      >
        {view === "login"
          ? "Don't have an account? Register here"
          : "Already have an account? Login here"}
      </Text>
    </VStack>
  );
};
export default Auth;
