import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import FilterIcon from "@/assets/images/filter.svg"
import SearchIcon from "@/assets/images/search.svg"

const Search = () => {
  return (
    <Input className="bg-white rounded-md" style={{
      marginHorizontal: 24
    }}>
    <InputSlot style={{
                    paddingLeft: 16,
                    paddingRight: 4,

                  }}>
      <InputIcon as={SearchIcon} width={16} height={16} />
    </InputSlot>
    <InputField placeholder="Search Location" />
    <InputSlot style={{
                    paddingRight: 16
                    }} onPress={() => console.log("pressed")}>
    <InputIcon as={FilterIcon} width={16} height={16} />
    </InputSlot>
  </Input>
  )
}

export default Search