import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { ArrowLeftIcon, Icon } from "@/components/ui/icon"
import { Pressable } from "react-native"
import PencilIcon from "@/assets/images/pencil.svg"
import DustbinIcon from "@/assets/images/dustbin.svg"


const SharedHeader = ({ editState }: {editState: {isEditing: boolean, setIsEditing: (isEditing: boolean) => void}}) => {

  const { isEditing, setIsEditing } = editState
  
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
          <Pressable>
            <DustbinIcon width={20} height={20} color={"black"} />
          </Pressable>
        )}
      <Pressable onPress={() => setIsEditing(!isEditing)}>
        <PencilIcon width={24} height={24} color={"black"} />
      </Pressable>
      </HStack>


    </HStack>
  )
}

export default SharedHeader