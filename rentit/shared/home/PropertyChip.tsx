import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

const PropertyChip = ({ state, children }: { 
    state: { selectedProperty: string; setSelectedProperty: (property: string) => void }; 
    children: string; 
}) => {
    const { selectedProperty, setSelectedProperty } = state;
    const isActive = selectedProperty === children; 

    return (
        <Pressable onPress={() => setSelectedProperty(children)}>
            <HStack 
                className={`p-2 items-center justify-center rounded-sm ${
                    isActive ? "bg-white" : "bg-white-25"
                }`}
            >
                <Text className={isActive ? "text-primary" : "text-white"}>{children}</Text>
            </HStack>
        </Pressable>
    );
};

export default PropertyChip;
