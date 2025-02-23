import { VStack } from "@/components/ui/vstack"
import { Text } from "@/components/ui/text"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Image } from "react-native"
import { Box } from "@/components/ui/box"
const CuratedRentalPropertyImage1 = require("@/assets/images/curated/curated-1.png")
const CuratedRentalPropertyImage2 = require("@/assets/images/curated/curated-2.png")

const CuratedRentalProperty = () => {

    return (
        <VStack className="justify-center" space="xl" style={{ paddingHorizontal: 24 }}>
            <VStack className="justify-center">
                <Heading size="md">Curated rental collection</Heading>
                <Text style={{ color: 'rgba(0, 0, 0, 0.25)', maxWidth: 200 }}>In your City</Text>
            </VStack>
            <HStack className="justify-between items-center">
                <Box style={{ position: "relative" }}>
                <Image source={CuratedRentalPropertyImage1} alt="family-image-1" />

                    <Text className="text-white" size="md"
                        style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            fontWeight: "bold",
                        }}
                    >
                        For Family
                    </Text>
                    
                    <Text className="text-white" size="xs"
                        style={{
                            position: "absolute",
                            top: 32,
                            left: 8,
                        }}
                    >
                        +1800 properties
                    </Text>
                    
                </Box>
                <Box style={{ position: "relative" }}>
                <Image source={CuratedRentalPropertyImage2} alt="family-image-2" />

                    <Text className="text-white" size="md"
                        style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            fontWeight: "bold",
                        }}
                    >
                        For Single Woman
                    </Text>
                    
                    <Text className="text-white" size="xs"
                        style={{
                            position: "absolute",
                            top: 32,
                            left: 8,
                        }}
                    >
                         +1560 properties
                    </Text>
                    
                </Box>
            </HStack>
        </VStack>
    )
}

export default CuratedRentalProperty