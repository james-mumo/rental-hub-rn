import {
  Image,
  Pressable,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import COLORS from '../../consts/colors';

const {width} = Dimensions.get('screen');

export default function DetailsSreen({navigation, route}) {
  const house = route.params;
  console.log(house);

  const InteriorCard = ({interior}) => {
    return <Image source={{uri: interior}} style={styles.interiorImage} />;
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
      />
      <ScrollView>
        <View style={styles.topView}>
          <Image source={house.mainImage} style={styles.mainImage} />

          <View style={styles.topViewHeaderActions}>
            <View style={styles.topViewAction}>
              <Icon
                name="backburger"
                size={20}
                color={COLORS.dark}
                onPress={() => navigation.goBack}
              />
            </View>
            <View style={styles.topViewAction}>
              <Icon
                name="cards-heart"
                color={COLORS.red}
                size={20}
                onPress={() => navigation.goBack}
              />
            </View>
          </View>

          {/* visit schedule */}
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 4,
              marginTop: -10,
              backgroundColor: COLORS.dark,
              paddingHorizontal: 10,
              paddingVertical: 6,
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text style={{color: COLORS.white}}>Schedule Visit</Text>
          </View>
        </View>

        {/* details container */}
        <View style={styles.detailsContainer}>
          <View style={styles.basicInfo}>
            <Text
              style={{color: COLORS.dark, fontWeight: 'bold', fontSize: 16}}>
              {house.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: COLORS.blue,
                  padding: 4,
                  borderRadius: 4,
                }}>
                <Text style={{color: COLORS.white}}>{house.rating}</Text>
              </View>
              <Text
                style={{color: COLORS.grey, fontSize: 14, fontWeight: 'bold'}}>
                {house.noOfRatings} Ratings
              </Text>
            </View>
          </View>
          {/* additional Info */}
          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {house.location}
          </Text>

          {/*  */}
          {/* Facilities container */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <View style={{flexDirection: 'row'}}>
              {house.features.map((feature, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                  key={index}>
                  <Icon
                    name={feature.icon}
                    size={16}
                    color={COLORS.grey}
                    style={{marginRight: 5}}
                  />
                  <Text>
                    {feature.number} {feature.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 4,
                color: COLORS.grey,
              }}>
              {house.subTitle}
            </Text>
          </View>
          {/*  */}

          {/*  */}

          {/* Interior list */}

          <FlatList
            contentContainerStyle={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              alignContent: 'center',
              borderColor: 'red',
              borderWidth: 1,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiorImages}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/*  */}
          {/* footer container */}
          <View style={styles.footer}>
            <View>
              <Text
                style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
                $1,500
              </Text>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Starting Price
              </Text>
            </View>
            <View style={styles.bookNowBtn}>
              <Text style={{color: COLORS.white}}>Book Now</Text>
            </View>
          </View>

          {/*  */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginHorizontal: 10,
    elevation: 20,
    marginTop: 14,
  },
  mainImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  topViewHeaderActions: {
    position: 'absolute',
    flexDirection: 'row',
    top: 6,
    marginHorizontal: 10,
    left: 7,
    right: 7,
    justifyContent: 'space-between',
    backgroundColor: COLORS.transparent,
  },
  topViewAction: {
    height: 36,
    width: 36,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},

  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 4,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
