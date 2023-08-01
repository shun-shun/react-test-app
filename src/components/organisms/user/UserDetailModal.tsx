import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode, memo, useEffect, useState } from "react";
import { User } from "../../../types/api/User";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};

const onClickUpdate = () => {
  alert("テスト");
};

export const UserDetailModal: FC<Props> = memo((props) => {
  const { user, isOpen, onClose, isAdmin = false } = props;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value);

  useEffect(() => {
    setUsername(user?.username ?? "");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザ詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input
                value={username}
                isReadOnly={!isAdmin}
                onChange={onChangeUsername}
              />
              <FormLabel>フルネーム</FormLabel>
              <Input
                value={name}
                isReadOnly={!isAdmin}
                onChange={onChangeName}
              />
              <FormLabel>MAIL</FormLabel>
              <Input
                value={email}
                isReadOnly={!isAdmin}
                onChange={onChangeEmail}
              />
              <FormLabel>TEL</FormLabel>
              <Input
                value={phone}
                isReadOnly={!isAdmin}
                onChange={onChangePhone}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});
