import { VStack } from "@/components/ui/vstack"
import { Text } from "@/components/ui/text"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import Swiper from "./Swiper";
const RecenlyPosted = () => {
    return (
        <VStack className="justify-center" space="xl" style={{ paddingHorizontal: 24 }}>
            <HStack className="justify-between items-start">
                <VStack className="justify-center">
                    <Heading size="md">Recently Posted Properties</Heading>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.25)', maxWidth: 200 }}>fresh properties, Be quick before rent out</Text>
                </VStack>
                <Text className="text-primary text-md" style={{ textDecorationLine: "underline" }}>View more</Text>
            </HStack>
                <Swiper />
        </VStack>
    )
}

export default RecenlyPosted