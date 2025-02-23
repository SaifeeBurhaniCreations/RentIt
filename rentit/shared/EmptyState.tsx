import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import EmptyStateIllustration from "@/assets/images/empty-state-illustration.svg"
const EmptyState = ({ message }: { message: string }) => {

    const [title, description] = message.split("|")
    return (
        <VStack className="justify-center items-center">
            <EmptyStateIllustration width={200} height={200} style={{ marginRight: 24 }} />
            <Heading size="2xl">{title}</Heading>
            <Text size="lg" className="text-gray">{description}</Text>
        </VStack>
    )
}

export default EmptyState