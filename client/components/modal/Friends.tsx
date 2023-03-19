import api from "@app/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalHeader,
  Skeleton,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FriendsModal = ({ isOpen, onClose, slug }: FriendsModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState<FriendRowProps[]>([]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/user/${slug}/friend`);
        console.log(data);
        if (data.success) {
          setFriends(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Friends
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {friends.length > 0 &&
            friends.map((friend) => <FriendRow {...friend} />)}
          {friends.length === 0 && !isLoading && (
            <Text>Have a Life bruh!!</Text>
          )}
          <Skeleton
            isLoaded={!isLoading}
            marginBlockStart="5px"
            height="30px"
          ></Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            marginBlockStart="5px"
            height="30px"
          ></Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            marginBlockStart="5px"
            height="30px"
          ></Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            marginBlockStart="5px"
            height="30px"
          ></Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            marginBlockStart="5px"
            height="30px"
          ></Skeleton>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
}

export { FriendsModal };

const FriendRow = ({ name, slug }: FriendRowProps) => {
  return (
    <HStack>
      <Avatar src="/avatar.png" name={name} />
      <VStack>
        <Text>{name}</Text>
        <Text>{slug}</Text>
      </VStack>
    </HStack>
  );
};

interface FriendRowProps {
  name: string;
  slug: string;
  avatar: string;
}
