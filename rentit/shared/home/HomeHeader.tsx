import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Pressable } from "react-native"
import HamBurgerIcon from "@/assets/images/hamburger.svg"
import NotificationIcon from "@/assets/images/notification.svg"
import PropertyChip from "./PropertyChip"
import { FlatList } from "react-native";
import Search from "./Search"
import { useState } from "react"

const propertyTypes = [
    { id: "1", name: "PG" },
    { id: "2", name: "Bunglow" },
    { id: "3", name: "Appartment/Flat" },
    { id: "4", name: "Shop" },
    { id: "5", name: "Office" },
    { id: "6", name: "Other" },
];

const HomeHeader = ({ navigation }: { navigation: any }) => {
    const [selectedProperty, setSelectedProperty] = useState(propertyTypes[0].name);

    return (
        <VStack className="bg-primary" space="2xl" style={{ paddingVertical: 24, borderWidth: 0, borderColor: "transparent", borderRadius: 30, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <HStack className="items-center justify-between" style={{ paddingHorizontal: 24 }}>
                <Pressable
                    className="bg-white"
                    style={{ paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}
                    onPress={() => navigation.navigate("Register" as never)}>
                    <HamBurgerIcon width={18} height={18} />
                </Pressable>
                <HStack className="items-center" space="xl">
                    <Text className="text-white text-lg" style={{ textDecorationLine: "underline" }}>Post proprety</Text>
                    <Pressable
                        className="bg-white"
                        style={{ paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}
                        onPress={() => navigation.navigate("Register" as never)}>
                        <NotificationIcon width={18} height={18} />
                    </Pressable>
                </HStack>
            </HStack>
            <VStack space="lg">
            <Text className="text-white text-md" style={{ paddingHorizontal: 24 }}>Your current location -  <Text className="text-white font-bold"> Indore</Text></Text>
            <FlatList
                data={propertyTypes}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 12, flexGrow: 1, alignItems: "center" }}
                renderItem={({ item }) => (
                    <PropertyChip 
                    key={item.id} 
                    state={{ selectedProperty, setSelectedProperty }}
                >
                    {item.name}
                </PropertyChip>
                )}
            />
            </VStack>
            <Search />
        </VStack>
    )
}

export default HomeHeader