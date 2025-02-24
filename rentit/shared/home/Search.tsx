import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import FilterIcon from "@/assets/images/filter.svg"
import SearchIcon from "@/assets/images/search.svg"
import StarIcon from "@/assets/images/star.svg"

const Search = ({setShowDrawer, value, endIcon}: {setShowDrawer: (showDrawer: boolean) => void, value: string, endIcon: string}) => {
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
    <InputField placeholder="Search Location" value={value} />
    <InputSlot style={{
                    paddingRight: 16
                    }} onPress={() => setShowDrawer(true)}>
    <InputIcon as={endIcon === "filter" ? FilterIcon : StarIcon} width={16} height={16} />
    </InputSlot>
  </Input>
  )
}

export default Search