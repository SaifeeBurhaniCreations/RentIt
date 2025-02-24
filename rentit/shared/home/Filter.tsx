import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { ArrowLeftIcon, Icon, CircleIcon } from "@/components/ui/icon"
import { FlatList, Pressable } from "react-native"
import {
    Radio,
    RadioGroup,
    RadioIndicator,
    RadioLabel,
    RadioIcon,
} from '@/components/ui/radio';
import {
    Drawer,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@/components/ui/drawer"
import { VStack } from "@/components/ui/vstack"
import { useState } from "react"
import ThreeDotIcon from "@/assets/images/ThreeDot.svg"
import Search from "./Search"
import FilterChip from "./FilterChip"
import { Text } from "@/components/ui/text"

const propertyTypes = [
    { id: "1", name: "PG" },
    { id: "2", name: "Bunglow" },
    { id: "3", name: "Appartment/Flat" },
    { id: "4", name: "Shop" },
    { id: "5", name: "Office" },
    { id: "6", name: "Other" },
];
const localities = [
    { id: "1", name: "Add" },
    { id: "2", name: "Ammar nagar" },
];
const Filter = ({ drawerState }: { drawerState: { showDrawer: boolean, setShowDrawer: (showDrawer: boolean) => void } }) => {
    const [browseBy, setBrowseBy] = useState("resident")
    const [selectedProperty, setSelectedProperty] = useState(propertyTypes[1].name);
    const [selectedLocality, setSelectedLocality] = useState(localities[1].name);

    const { showDrawer, setShowDrawer } = drawerState
    return (
        <Drawer
            isOpen={showDrawer}
            onClose={() => {
                setShowDrawer(false)
            }}
            size="full"
        >
            <DrawerBackdrop />
            <DrawerContent className="px-4 py-3">
                <DrawerHeader style={{
                    paddingHorizontal: 12,
                    marginBottom: 16
                }}>
                    <Pressable onPress={() => setShowDrawer(false)}>
                        <Box style={{ transform: [{ scale: 1.2 }] }}>
                            <Icon size="xl" as={ArrowLeftIcon} />
                        </Box>
                    </Pressable>
                    <Heading size="xl">Filter</Heading>
                    <HStack space="md">

                        <Pressable>
                            <ThreeDotIcon width={24} height={24} color={"black"} />
                        </Pressable>
                    </HStack>
                </DrawerHeader>
                <DrawerBody className="mt-0 mb-0">
                    <VStack className="gap-5" style={{ paddingHorizontal    : 16 }}>
                        <Search setShowDrawer={setShowDrawer} value="Indore" endIcon="star" />
                        <Heading size="md">Browse by</Heading>
                        <RadioGroup value={browseBy} onChange={setBrowseBy}>
                            <HStack className="gap-3">
                                <Radio value="resident" size="md">
                                    <RadioIndicator>
                                        <RadioIcon as={CircleIcon} />
                                    </RadioIndicator>
                                    <RadioLabel>Resident</RadioLabel>
                                </Radio>
                                <Radio value="commercial" size="md">
                                    <RadioIndicator>
                                        <RadioIcon as={CircleIcon} />
                                    </RadioIndicator>
                                    <RadioLabel>Commercial</RadioLabel>
                                </Radio>
                            </HStack>
                        </RadioGroup>

                        <VStack className="gap-2">
                            <Heading size="md">I am looking For</Heading>
                            <FlatList
                                data={propertyTypes}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{  gap: 12, flexGrow: 1, alignItems: "center" }}
                                renderItem={({ item }) => (
                                    <FilterChip key={item.id}
                                    state={{ selectedValue: selectedProperty, setSelectedValue: setSelectedProperty }}>
                                        {item.name}
                                    </FilterChip>
                                )}
                            />
                        </VStack>

                        <VStack className="gap-2">
                            <Heading size="md">Locality</Heading>
                            <FlatList
                                data={localities}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{  gap: 12, flexGrow: 1, alignItems: "center" }}
                                renderItem={({ item }) => (
                                    <FilterChip key={item.id}
                                    state={{ selectedValue: selectedLocality, setSelectedValue: setSelectedLocality }}>
                                        {item.name}
                                    </FilterChip>
                                )}
                            />
                        </VStack>
                    </VStack>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default Filter