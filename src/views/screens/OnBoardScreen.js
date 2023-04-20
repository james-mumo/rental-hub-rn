import {
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {useEffect} from 'react';
import COLORS from '../../consts/colors';
import NetInfo from '@react-native-community/netinfo';

export default function OnBoardScreen({navigation}) {
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert('Device is not connected to the internet');
      }
    });
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />
      <Image
        source={{
          uri: 'https://res.cloudinary.com/djv535hkn/image/upload/v1681872997/nairobiTower_lulx65.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.indicatorActive]} />
      </View>

      <View style={{paddingHorizontal: 20, paddingStart: 20, paddingTop: 30}}>
        {/* title container */}
        <View>
          <Text style={styles.title}>Find your </Text>
          <Text style={styles.title}>dream home </Text>
        </View>
        {/* text container */}
        <View>
          <Text style={styles.textStyle}>
            With just few clicks find an ideal home
          </Text>
          <Text style={styles.textStyle}>and Schedule a visit</Text>
        </View>

        {/* the get started button */}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 60,
        }}>
        <Pressable
          style={{borderWidth: 0, borderColor: 'red'}}
          onPress={() => navigation.navigate('HomeScreen')}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: '100%',
    borderBottomLeftRadius: 95,
  },
  indicatorContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 3,
    width: 50,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.grey},
  btn: {
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 22,
  },
});
