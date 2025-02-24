import FileIcon from "@/assets/images/bottom-bar/pay-rent.svg";
import InboxIcon from "@/assets/images/bottom-bar/inbox.svg";
import FavouriteIcon from "@/assets/images/bottom-bar/favourite.svg";
import ProfileIcon from "@/assets/images/bottom-bar/profile.svg";
import HomeIcon from "@/assets/images/bottom-bar/home.svg";


import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "react-native";
import { Box } from "@/components/ui/box";

const BottomBar = () => {
    return (
        <HStack className="justify-between items-center bg-white" style={{ paddingHorizontal: 24, paddingVertical: 12, position: "relative" }}>
            <VStack className="justify-center items-center">
                <Icon size="xl" as={FileIcon} />
                <Text style={{ color: "#00000080" }}>Pay Rent</Text>
            </VStack>
            <VStack className="justify-center items-center">
                <Icon size="xl" as={InboxIcon} />
                <Text style={{ color: "#00000080" }}>Inbox</Text>
            </VStack>
            <VStack className="justify-center items-center">
                <Box className="justify-center items-center bg-light rounded-full" style={{
                    padding: 24,
                    position: "absolute",
                    bottom: 30,
                    left: "50%",
                    transform: [{ translateX: -35 }],
                    // borderWidth: 12,
                    // borderColor: "#f2f2f2",
                }} >
                    <Icon size="xl" as={HomeIcon} />
                </Box>
                <Text size="xl" className="text-primary" style={{ marginTop: 16, fontWeight: "bold" }}>Home</Text>
            </VStack>
            <VStack className="justify-center items-center">
                <Icon size="xl" as={FavouriteIcon} />
                <Text style={{ color: "#00000080" }}>Favourite</Text>
            </VStack>
            <VStack className="justify-center items-center">
                <Icon size="xl" as={ProfileIcon} />
                <Text style={{ color: "#00000080" }}>Profile</Text>
            </VStack>

        </HStack>
    )
}

export default BottomBar