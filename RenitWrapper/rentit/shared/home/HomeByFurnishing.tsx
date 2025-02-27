import { VStack } from "@/components/ui/vstack"
import { Text } from "@/components/ui/text"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Image } from "react-native"
import { Box } from "@/components/ui/box"
import { ScrollView } from "react-native-gesture-handler"
const CategoryImage1 = require("@/assets/images/homes-by-furnishing/category-1.png")
const CategoryImage2 = require("@/assets/images/homes-by-furnishing/category-2.png")

const HomeByFurnishing = () => {

    return (
        <VStack className="justify-center" space="xl" style={{ paddingHorizontal: 24 }}>
            <HStack className="justify-between items-start">
                <VStack className="justify-center">
                    <Heading size="md">Homes by Furnishing</Heading>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.25)', maxWidth: 200 }}>Choose your prefer furnishing</Text>
                </VStack>
                <Text className="text-primary text-md" style={{ textDecorationLine: "underline" }}>View more</Text>
            </HStack>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <HStack className="items-center" space="xl">
                    <Box style={{ position: "relative" }}>
                        <Image source={CategoryImage1} alt="family-image-1" />

                        <Box
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
                            }}
                        >
                            <Text className="text-white" size="md" style={{ fontWeight: "bold" }}>
                            Furnished
                            </Text>
                        </Box>
                    </Box>

                    <Box style={{ position: "relative" }}>
                        <Image source={CategoryImage2} alt="family-image-2" />
                        <Box
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
                            }}
                        >
                            <Text className="text-white" size="md" style={{ fontWeight: "bold" }}>
                                Semi-Furnished
                            </Text>
                        </Box>
                    </Box>
                    <Box style={{ position: "relative" }}>
                        <Image source={CategoryImage2} alt="family-image-3" />
                        <Box
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
                            }}
                        >
                            <Text className="text-white" size="md" style={{ fontWeight: "bold" }}>
                            Unfurnished
                            </Text>
                        </Box>

                    </Box>
                </HStack>
            </ScrollView>
        </VStack>
    )
}

export default HomeByFurnishing