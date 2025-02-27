import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "react-native";
import HamBurgerIcon from "@/assets/images/hamburger.svg";
import NotificationIcon from "@/assets/images/notification.svg";
import PropertyChip from "./PropertyChip";
import { FlatList } from "react-native";
import Search from "./Search";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { fetchPropertyType, fetchNotifications } from "@/services/home.service";
import { NotificationResponse, PropertyTypeResponse } from "@/types/types";

const userId = "123";



const HomeHeader = ({ navigation, setShowDrawer }: { navigation: any; setShowDrawer: (showDrawer: boolean) => void }) => {
  const { data: propertyTypeData, isLoading: propertyTypeLoading, error: propertyTypeError } = useQuery<PropertyTypeResponse>({
    queryKey: ["propertyType"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 60 * 60 * 1000,
    queryFn: fetchPropertyType,
  });

  const { data: notificationsData, isLoading: notificationsLoading, error: notificationsError } = useQuery<NotificationResponse>({
    queryKey: ["notifications", userId],
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchNotifications(userId),
  });

  const propertyTypes = propertyTypeData?.propertyTypes || [];
  const defaultProperty = propertyTypes[0]?.name || "PG";
  const [selectedProperty, setSelectedProperty] = useState(defaultProperty);

  if (propertyTypeLoading || notificationsLoading) return <Spinner />;
  if (propertyTypeError || notificationsError)
    return <Text>Error: {propertyTypeError?.message || notificationsError?.message}</Text>;

  const notifications = notificationsData?.notifications || [];

  return (
    <VStack
      className="bg-primary"
      space="2xl"
      style={{ paddingVertical: 24, borderWidth: 0, borderColor: "transparent", borderRadius: 30, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <HStack className="items-center justify-between" style={{ paddingHorizontal: 24 }}>
        <Pressable
          className="bg-white"
          style={{ paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}
          onPress={() => navigation.navigate("Register" as never)}
        >
          <HamBurgerIcon width={18} height={18} />
        </Pressable>
        <HStack className="items-center" space="xl">
          <Text className="text-white text-lg" style={{ textDecorationLine: "underline" }}>
            Post property
          </Text>
          <Pressable
            className="bg-white"
            style={{ paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}
            onPress={() => navigation.navigate("Register" as never)}
          >
            <NotificationIcon width={18} height={18} />
          </Pressable>
        </HStack>
      </HStack>
      <VStack space="lg">
        <Text className="text-white text-md" style={{ paddingHorizontal: 24 }}>
          Your current location - <Text className="text-white font-bold"> Indore</Text>
        </Text>
        <FlatList
          data={propertyTypes}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12, flexGrow: 1, alignItems: "center" }}
          renderItem={({ item }) => (
            <PropertyChip state={{ selectedProperty, setSelectedProperty }}>
              {item.name}
            </PropertyChip>
          )}
        />
      </VStack>
      <Search setShowDrawer={setShowDrawer} value="Indore" endIcon="filter" />
    </VStack>
  );
};

export default HomeHeader;