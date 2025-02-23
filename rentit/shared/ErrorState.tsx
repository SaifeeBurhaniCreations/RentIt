import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import ErrorStateIllustration from "@/assets/images/error-state-illustration.svg"
const ErrorState = ({ message }: { message: string }) => {
  return (
    <VStack className="justify-center items-center">
    <ErrorStateIllustration width={200} height={200} style={{ marginRight: 24 }} />
    <Heading size="2xl">Error - 500</Heading>
    <Text size="lg" className="text-gray">{ message }</Text>
</VStack>
  )
}

export default ErrorState