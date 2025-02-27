import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import InboxAvatar from "@/assets/images/inbox/inbox.svg"
import { Heading } from "@/components/ui/heading"
import { Box } from "@/components/ui/box"
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import { useState } from "react"

const Message = ({ message, isEditing, deleteState }: { message: { title: string, description: string, sender: string, timestamp: string, id: number }, isEditing: boolean, deleteState: { deletingInboxId: string[], setDeletingInboxId: (deletingInboxId: string[]) => void } }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { deletingInboxId, setDeletingInboxId } = deleteState

  const handleCheckboxChange = () => {
    setSelectedItems((prev) =>
      prev.includes(String(message.id))
        ? prev.filter((id) => id !== String(message.id)) 
        : [...prev, String(message.id)]
    )
  }

  return (
    <HStack space={isEditing ? "lg" : "2xl"} style={{ alignItems: "center", boxShadow: "0px 1px 0px 0px rgba(12, 178, 172, 0.10)", paddingVertical: 16 }}>
      {isEditing && (
        <Checkbox
          value={String(message.id)}
          isChecked={selectedItems.includes(String(message.id))}
          onChange={handleCheckboxChange}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </Checkbox>
      )}
      <InboxAvatar width={48} height={48} />
      <Box>
        <Heading size="lg">
          {message.title.slice(0, 18)}
          {message.title.length > 18 ? "..." : ""}
        </Heading>
        <Text size="md">
          {message.description.slice(0, 20)}
          {message.description.length > 20 ? "..." : ""}
        </Text>
      </Box>
      <VStack style={{ alignSelf: "flex-end" }}>
        <Text size="md">{message.timestamp}</Text>
      </VStack>
    </HStack>
  )
}

export default Message;
