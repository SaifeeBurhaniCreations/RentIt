import { VStack } from '@/components/ui/vstack';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '@/shared/home/HomeHeader';
import RecenlyPosted from '@/shared/home/RecenlyPosted';
import CuratedRentalProperty from '@/shared/home/CuratedRentalProperty';
import HomeByFurnishing from '@/shared/home/HomeByFurnishing';
import { useState } from 'react';
import Filter from '@/shared/home/Filter';

const Home = () => {
    const navigation = useNavigation();
    const [showDrawer, setShowDrawer] = useState(false)
   
    return (
        <VStack space="3xl" style={styles.container}>
            <HomeHeader navigation={navigation} setShowDrawer={setShowDrawer} />
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                <VStack space="3xl">
                    <RecenlyPosted />
                    <CuratedRentalProperty />
                    <HomeByFurnishing />
                </VStack>
            </ScrollView>
            <Filter drawerState={{showDrawer, setShowDrawer}} />
        </VStack>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});


export default Home