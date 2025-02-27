import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Children, ReactNode } from "react";
import { Box } from "@/components/ui/box";

export default function OrderedList({ children }: { children: ReactNode }) {
    const childArray = Children.toArray(children);

    return (
        <VStack space="md">
            {childArray.map((child, index) => (
                <Box key={index} style={{ flexDirection: "row" }}>
                    <Text>{index + 1}. </Text>
                    <Text style={{ flex: 1 }}>{child}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export { OrderedList };
