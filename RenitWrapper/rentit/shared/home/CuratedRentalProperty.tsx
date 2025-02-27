import { VStack } from "@/components/ui/vstack"
import { Text } from "@/components/ui/text"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Image } from "react-native"
import { Box } from "@/components/ui/box"
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { fetchCuratedRentalProperty } from '@/services/home.service';

const CuratedRentalPropertyImage1 = require("@/assets/images/curated/curated-1.png")
const CuratedRentalPropertyImage2 = require("@/assets/images/curated/curated-2.png")

const CuratedRentalProperty = () => {


    const { data, isLoading, error } = useQuery({ queryKey: ['curatedRentalProperty'],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 60 * 60 * 1000,
        queryFn: fetchCuratedRentalProperty });

    if (isLoading) return <Spinner />;
    if (error) return <Text>Error: {error.message}</Text>;

    const curatedRentalProperty = data?.curatedProperties || [];

    const imageMap: Record<string, any> = {
        "For Family": CuratedRentalPropertyImage1,
        "For Single Woman": CuratedRentalPropertyImage2
    }


    return (
        <VStack className="justify-center" space="xl" style={{ paddingHorizontal: 24 }}>
            <VStack className="justify-center">
                <Heading size="md">Curated rental collection</Heading>
                <Text style={{ color: 'rgba(0, 0, 0, 0.25)', maxWidth: 200 }}>In your City</Text>
            </VStack>
            <HStack className="justify-between items-center">
                {
                    curatedRentalProperty.map((property) => (
                        <Box key={property.id} style={{ position: "relative" }}>
                            <Image source={imageMap[property.title]} alt="family-image-1" />

                    <Text className="text-white" size="md"
                        style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            fontWeight: "bold",
                        }}
                    >
                        {property.title}
                    </Text>
                    
                    <Text className="text-white" size="xs"
                        style={{
                            position: "absolute",
                            top: 32,
                            left: 8,
                        }}
                    >
                        {property.description}
                    </Text>
                    
                </Box>
                ))
                }
                {/* <Box style={{ position: "relative" }}>
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
                    
                </Box> */}
            </HStack>
        </VStack>
    )
}

export default CuratedRentalProperty