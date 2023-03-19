import { useAuth } from "@app/hooks";
import {
  Heading,
  VStack,
  Image,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FriendsModal } from "../modal/Friends";

export const SideNav = () => {
  const { logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <FriendsModal isOpen={isOpen} onClose={onClose} slug={user.slug} />
      )}
      <VStack
        backgroundColor="white"
        paddingInline="18px"
        height="100vh"
        width="300px"
        borderRight="1px solid rgba(0, 0, 0, 0.1)"
        rowGap="20px"
      >
        <Heading fontFamily="Roboto" fontWeight="bold" fontSize="48px">
          Instant!!
        </Heading>
        <VStack rowGap="8px">
          <Image
            src="/avatar.png"
            width="150px"
            height="150px"
            borderRadius="100%"
          />
          <Heading
            textColor="#5a5a5a"
            fontFamily="Roboto"
            fontSize="28px"
            fontWeight="bold"
          >
            {user?.name}
          </Heading>
          <Text
            fontFamily="Roboto"
            fontSize="18px"
            textColor="#5a5a5a"
            style={{
              marginTop: "0px",
            }}
          >
            @{user?.slug}
          </Text>
          <HStack columnGap="15px">
            <VStack
              cursor="pointer"
              width="80px"
              onClick={() => {
                onOpen();
              }}
            >
              <Heading
                fontWeight="bold"
                fontFamily="Roboto"
                fontSize="26px"
                textColor="#5a5a5a"
              >
                540
              </Heading>
              <Text
                fontFamily="Roboto"
                fontSize="18px"
                textColor="#5a5a5a"
                style={{
                  marginTop: "-5px",
                }}
              >
                Friends
              </Text>
            </VStack>
            <VStack width="80px">
              <Heading
                fontWeight="bold"
                fontFamily="Roboto"
                fontSize="26px"
                textColor="#5a5a5a"
              >
                300
              </Heading>
              <Text
                fontFamily="Roboto"
                fontSize="18px"
                textColor="#5a5a5a"
                style={{
                  marginTop: "-5px",
                }}
              >
                Posts
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack width="100%">
          <HStack
            width="100%"
            alignItems="flex-end"
            cursor="pointer"
            paddingInline="15px"
            borderRadius="10px"
            paddingBlock="10px"
            _hover={{
              backgroundColor: "#f2f2f2",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src="/icons/Home.svg" width="30px" height="30px" />
            <Text
              paddingInline="10px"
              fontFamily="Roboto"
              fontSize="18px"
              fontWeight="bold"
              textColor="#5a5a5a"
            >
              Home
            </Text>
          </HStack>
          <HStack
            width="100%"
            alignItems="flex-end"
            cursor="pointer"
            paddingInline="15px"
            borderRadius="10px"
            paddingBlock="10px"
            _hover={{
              backgroundColor: "#f2f2f2",
            }}
            onClick={() => {
              router.push(`/${user.slug}`);
            }}
          >
            <Image src="/icons/Profile.svg" width="30px" height="30px" />
            <Text
              paddingInline="10px"
              fontFamily="Roboto"
              fontSize="18px"
              fontWeight="bold"
              textColor="#5a5a5a"
            >
              Account
            </Text>
          </HStack>
          <HStack
            width="100%"
            alignItems="flex-end"
            cursor="pointer"
            paddingInline="15px"
            borderRadius="10px"
            paddingBlock="10px"
            _hover={{
              backgroundColor: "#f2f2f2",
            }}
            onClick={async () => {
              logout();
            }}
          >
            <Image src="/icons/Logout.svg" width="30px" height="30px" />
            <Text
              paddingInline="10px"
              fontFamily="Roboto"
              fontSize="18px"
              fontWeight="bold"
              textColor="#5a5a5a"
            >
              Logout
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};
