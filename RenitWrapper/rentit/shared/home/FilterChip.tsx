import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";
import PlusIcon from "@/assets/images/plus.svg";

const FilterChip = ({
  state: { selectedValue, setSelectedValue }, 
  children,
}: {
  state: {
    selectedValue: string;
    setSelectedValue: (value: string) => void;
  };
  children: string;
}) => {
  const isActive = selectedValue === children; 

  const handlePress = () => {
    if (children === "Add") {
        console.log("Add");
    //   openModal(); 
    } else {
      setSelectedValue(children);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <HStack
        className={`p-2 items-center justify-center rounded-sm ${
          isActive ? "bg-primary-light border border-primary" : "bg-gray-light"
        }`}
      >
        <Text className={isActive ? "text-primary" : "text-black"}>
          {children}
        </Text>
        {children === "Add" && (
          <PlusIcon width={12} height={12} style={{ marginLeft: 4 }} />
        )}
      </HStack>
    </Pressable>
  );
};

export default FilterChip;