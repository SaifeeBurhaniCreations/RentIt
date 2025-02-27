import { VStack } from '@/components/ui/vstack'
import { ScrollView, StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/navigation/types";
import { HStack } from '@/components/ui/hstack';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';

import FileActiveIcon from "@/assets/images/file-active.svg";
import AgreementEmblem from "@/assets/images/graphic-stamp-paper.svg"
import { Text } from '@/components/ui/text';
import { Dimensions } from "react-native";
// import { OrderedList } from '@/components/ui/orderlist';
import OrderedList from '@/shared/OrderList';
const AgreementSummary = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { height } = Dimensions.get("window");


    return (
        <VStack style={styles.container}>
            <VStack space="4xl" style={{ width: "100%" }}>
                <HStack className="items-center justify-between w-full">
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Box style={{ transform: [{ scale: 1.2 }] }}>
                            <Icon size="xl" as={ArrowLeftIcon} />
                        </Box>
                    </Pressable>
                    <Heading size="xl">Rent Agreement</Heading>
                    <Pressable
                        onPress={() => navigation.navigate("Register" as never)}>
                        <FileActiveIcon width={24} height={24} color={"black"} />
                    </Pressable>

                </HStack>
            </VStack>
            <Box style={{ alignSelf: "center" }}>
                <AgreementEmblem width={"209px"} />
            </Box>

            <ScrollView
                style={{ maxHeight: height }}
                className="w-full">
                <VStack className='w-full' space='4xl'>
                    <Text className="text-md">
                        This Agreement is made on the <Text className="font-bold">4th</Text> day of March, 2025, by and between <Text className="font-bold">Aliasger</Text>, residing at <Text className="font-bold">Ral Mohalla, Indore</Text>, and reachable at <Text className="font-bold">9634592035</Text>, hereinafter referred to as the "LESSOR" of the one part, and <Text className="font-bold">Sarrah</Text>, residing at <Text className="font-bold">Saifee Nagar, Indore</Text>, and reachable at <Text className="font-bold">7953592035</Text>, hereinafter referred to as the "LESSEE" of the other part.
                    </Text>

                    <Text className='text-md'>
                        WHEREAS the Lessor is the lawful owner of, and otherwise well and sufficiently entitled to, a <Text className="font-bold">residential apartment</Text>, comprising <Text className="font-bold">one floor without parking</Text>, hereinafter referred to as the 'said premises'.
                    </Text>

                    <Text className='text-md'>
                        AND WHEREAS, at the request of the Lessee, the Lessor has agreed to lease the said premises to the Lessee for a term of <Text className="font-bold">12 months</Text>, commencing from February 21, 2025, in the manner hereinafter appearing.
                    </Text>

                    <Text className='text-md'>
                        NOW, THEREFORE, THIS AGREEMENT WITNESSETH, AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:
                    </Text>
                    <OrderedList>
                        <Text className='text-md'>
                            That the Lessor hereby grants to the Lessee the right to enter, use, and remain in the said premises along with the existing fixtures and fittings listed in Annexure 1 to this Agreement. The Lessee shall be entitled to peacefully possess and enjoy the said premises for residential use and the other rights herein.
                        </Text>
                        <Text className='text-md'>
                            That the lease hereby granted shall, unless terminated earlier under any provision of this Agreement, remain in force for a period of <Text className="font-bold">12 months</Text>.
                        </Text>
                        <Text className='text-md'>
                            That the Lessee shall have the option to terminate this lease by giving <Text className="font-bold">30 days </Text> prior written notice to the Lessor.
                        </Text>
                        <Text className='text-md'>
                            That the Lessee shall have no right to create any sub-lease, assign, transfer, or otherwise part with possession of the said premises or any portion thereof.
                        </Text>
                        <Text className='text-md'>
                            That the Lessee shall use the said premises only for residential purposes.
                        </Text>
                        <Text className='text-md'>
                            That the Lessor shall, before handing over the said premises, ensure that the sanitary, electrical, and water supply connections, along with other fittings pertaining to the said premises, are in proper working condition. It is agreed that the Lessor shall be responsible for ensuring their return in working condition at the time of re-possession of the said premises, subject to normal wear and tear.
                        </Text>
                        <Text className='text-md'>
                        That the Lessee shall not be authorized to make any alterations or structural modifications to the said premises.
                        </Text>
                        <Text className='text-md'>
                        That the Lessee shall be responsible for carrying out day-to-day repairs at their own cost. However, any major repairs, including structural issues, electrical or water connection faults, plumbing leaks, or water seepage, shall be attended to by the Lessor. If the Lessor fails to carry out such repairs upon receiving written notice from the Lessee, the Lessee may undertake the necessary repairs, and the Lessor shall be liable to immediately reimburse the costs incurred by the Lessee.
                        </Text>
                        <Text className='text-md'>
                        That the Lessor or their duly authorized agent shall have the right to enter the said premises or any part thereof at a mutually agreed-upon convenient time for the purpose of inspection.
                        </Text>
                        <Text className='text-md'>
                        That in consideration of the use of the said premises, the Lessee agrees to pay the Lessor a monthly rent of <Text className='font-bold'>₹25,000</Text> during the term of this Agreement. The rent shall be paid in advance on or before the <Text className='font-bold'>5th</Text> day of each calendar month.
                        </Text>
                        <Text className='text-md'>
                        It is hereby agreed that if the Lessee defaults in the payment of rent for a consecutive period of three months, the Lessor shall be entitled to terminate the lease.
                        </Text>
                        <Text className='text-md'>
                        That the Lessee has paid the Lessor a sum of <Text className='font-bold'>₹5000</Text> as a deposit, free of interest. The said deposit shall be refunded to the Lessee simultaneously upon vacating the premises. In the event that the Lessor fails to refund the deposit amount as agreed, the Lessee shall be entitled to continue occupying the premises without paying rent until the full refund is made
                        </Text>
                        <Text className='text-md'>
                        That the Lessor shall be responsible for the payment of all taxes and levies related to the said premises, including but not limited to House Tax, Property Tax, and any other cesses or statutory taxes levied by the Government or its departments. During the term of this Agreement, the Lessor shall comply with all applicable rules, regulations, and requirements imposed by any statutory authority, whether local, state, or central, in relation to the said premises.
                        </Text>
                    </OrderedList>
                    <Text className='text-md'>
                    IN WITNESS WHEREOF, the parties hereto have executed this Agreement on the day and year first above written.
                    </Text>
                    <HStack className="items-center justify-between w-full" space="xl">
                        <VStack space="md" flex={1}>
                            <Text className='text-md'>Agreed & Accepted by the Lessor</Text>
                            <Text className='font-bold text-primary text-md'>Aliasger</Text>
                        </VStack>
                        <VStack space="md" flex={1}>
                            <Text className='text-md'>Agreed & Accepted by the Lessee</Text>
                            <Text className='font-bold text-primary text-md'>Sarrah</Text>
                        </VStack>
                    </HStack>
                    <Text className='text-md'>WITNESS</Text>

                    <OrderedList>
                        <Text className='text-md font-bold'>
                            Ammar
                        </Text>
                        <Text className='text-md font-bold'>
                            Taher
                        </Text>
                    </OrderedList>
                </VStack>
            </ScrollView>
        </VStack>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 24,
        gap: 24,
    },

});

export default AgreementSummary