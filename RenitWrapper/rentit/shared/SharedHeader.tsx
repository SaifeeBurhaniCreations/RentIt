import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { ArrowLeftIcon, Icon, CloseIcon } from "@/components/ui/icon"
import { Pressable } from "react-native"
import PencilIcon from "@/assets/images/pencil.svg"
import DustbinIcon from "@/assets/images/dustbin.svg"

import { Button, ButtonText } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"
import { Spinner } from "@/components/ui/spinner"

import { useState } from "react"

const SharedHeader = ({ editState, deleteState }: {editState: {isEditing: boolean, setIsEditing: (isEditing: boolean) => void}, deleteState: {deletingInboxId: string[], handleDeleteMessage: () => void}}) => {

  const [showModal, setShowModal] = useState(false)

  const { isEditing, setIsEditing } = editState

  const { deletingInboxId, handleDeleteMessage } = deleteState
  
  return (
    <HStack className="bg-white justify-between items-center" style={{
      padding: 24
    }}>

      <Pressable>
        <Box style={{ transform: [{ scale: 1.2 }] }}>
          <Icon size="xl" as={ArrowLeftIcon} />
        </Box>
      </Pressable>
      <Heading size="xl">Inbox</Heading>
      <HStack space="md">
        { isEditing && (
          <Center className="h-[300px]">
            <Pressable onPress={() => setShowModal(true)}>
            <DustbinIcon width={20} height={20} color={"black"} />
          </Pressable>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false)
              }}
              size="md"
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="md" className="text-typography-950">
                    Delete this message(s)?
                  </Heading>
                  <ModalCloseButton>
                    <Icon
                      as={CloseIcon}
                      size="md"
                      className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                    />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                  <Text size="sm" className="text-typography-500">
                    Elevate user interactions with our versatile modals. Seamlessly
                    integrate notifications, forms, and media displays. Make an impact
                    effortlessly.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onPress={() => {
                      setShowModal(false)
                      handleDeleteMessage()
                    }}
                    action="negative"
                  >
                    <ButtonText>Delete</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Center>

        )}
      <Pressable onPress={() => setIsEditing(!isEditing)}>
        <PencilIcon width={24} height={24} color={"black"} />
      </Pressable>
      </HStack>
    </HStack>
  )
}

export default SharedHeader