import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StyleSheet, Image, Dimensions, ImageSourcePropType  } from "react-native";

const recentProperty1 = require("@/assets/images/recent-properties/recent-property-1.png");
const recentProperty2 = require("@/assets/images/recent-properties/recent-property-2.png");
const recentProperty3 = require("@/assets/images/recent-properties/recent-property-1.png");

const screenWidth = Dimensions.get("window").width;   

type PropertyProps = {
  title: string;
  description: string;
  price: string;
  postedBy: string;
  uploadedAt: string;
}

const propertyImageMap: { [key: string]: ImageSourcePropType  } = {
  "Slide 1": recentProperty1,
  "Slide 2": recentProperty2,
  "Slide 3": recentProperty3,
}

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  return (
    <VStack className="bg-white rounded-lg" space="lg" style={styles.card}>
      <Image 
        source={propertyImageMap[property.title]} 
        style={styles.image} 
        resizeMode="cover"
      />
      <VStack style={styles.content} space="xs">
        <Heading size="lg">{property.title}</Heading>
        <Text size="sm" className="text-gray-700">{property.description}</Text>
      </VStack>
      
      <VStack style={styles.content} space="xs">
        <Heading size="lg" className="text-primary">{property.price}</Heading>
        <HStack space="sm">
        <Text size="sm" className="text-gray">{property.postedBy}</Text>
        <Text size="sm" className="text-gray-700">{property.uploadedAt}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.6, 
    backgroundColor: "white",
    borderRadius: 4,
    paddingBottom: 16,
    shadowColor: "#18274B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4, 
  },
  image: {
    width: "100%", 
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default PropertyCard;
