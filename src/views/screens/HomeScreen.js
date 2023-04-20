import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import {Picker} from '@react-native-picker/picker';

import COLORS from '../../consts/colors';
import {availableHouses, serviceType} from '../../consts/data';
import {counties} from '../../consts/counties';

export default function HomeScreen({navigation}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState('Select City');

  const [searchCity, setSearchCity] = useState('Mombasa');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rooms: 0,
    priceRange: null,
    location: null,
  });

  const handleRoomsChange = value => {
    setSelectedFilters(prevState => ({...prevState, rooms: value}));
  };

  const handlePriceRangeChange = value => {
    setSelectedFilters(prevState => ({...prevState, priceRange: value}));
  };

  const handleLocationChange = value => {
    setSelectedFilters(prevState => ({...prevState, location: value}));
  };

  const handleFilterApply = () => {
    // TODO: apply selected filters
    setModalVisible(false);
  };

  const handlePress = index => {
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
      />

      <ScrollView>
        {/* Header Container */}
        <View style={styles.header}>
          <View>
            <Text style={{color: COLORS.grey}}>Location</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 25,
                overflow: 'visible',
              }}>
              <Text
                style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
                {searchCity}
              </Text>
              <Picker
                selectedValue={selectedCity}
                style={{width: 40}}
                onValueChange={(itemValue, itemIndex) =>
                  setSearchCity(itemValue)
                }>
                {counties.map(county => (
                  <Picker.Item
                    key={county.code}
                    label={county.name}
                    value={county.name}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/djv535hkn/image/upload/v1681872997/nairobiTower_lulx65.jpg',
            }}
            style={styles.profImage}
          />
        </View>

        {/* Searchbar and filter */}
        <View style={{borderColor: 'red', borderWidth: 0, marginTop: -10}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={styles.inputContainer}>
                <Icon
                  name="card-search-outline"
                  size={20}
                  color={COLORS.grey}
                />
                <TextInput placeholder="Search address, city, location" />
              </View>

              <View style={styles.sortBtn}>
                <Icon
                  name="tune"
                  color={COLORS.white}
                  size={25}
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* types tags */}
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {serviceType.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceType}
                onPress={() => handlePress(index)}>
                <View style={styles.cardContent}>
                  <Icon name={item.icon} style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/*  */}
        {/* near you */}
        <View style={{paddingHorizontal: 2, paddingVertical: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}>
            <Text
              style={{fontSize: 20, color: COLORS.dark, fontWeight: 'bold'}}>
              Near you
            </Text>
            <Text style={{color: COLORS.grey, fontWeight: 'thin'}}>
              Show all
            </Text>
          </View>
          {/*  */}
          <ScrollView horizontal={true}>
            {availableHouses.map((house, index) => (
              <TouchableHighlight key={index}>
                <Pressable
                  onPress={() => navigation.navigate('DetailsScreen', house)}>
                  <View
                    style={{
                      margin: 10,
                      padding: 5,
                      overflow: 'hidden',
                      width: 250,
                      height: 250,
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      shadowColor: COLORS.grey,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                    <View style={{height: 180}}>
                      <Image
                        source={{
                          uri: 'https://res.cloudinary.com/djv535hkn/image/upload/v1681872997/nairobiTower_lulx65.jpg',
                        }}
                        style={{flex: 1, height: 180, borderRadius: 7}}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          marginLeft: 3,
                          top: 10,
                          backgroundColor: COLORS.grey,
                          padding: 5,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            textAlign: 'center',
                          }}>
                          {house.location}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 10,
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            marginLeft: 5,
                          }}>
                          {house.title}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 3}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        {house.amenities.map((amenity, index) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 10,
                            }}
                            key={index}>
                            <Icon
                              name={amenity.icon}
                              size={16}
                              color={COLORS.grey}
                              style={{marginRight: 5}}
                            />
                            <Text>{amenity.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </Pressable>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>

        {/* featured */}
        <View style={{marginTop: 13}}>
          {/* featured header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}>
            <Text
              style={{fontSize: 20, color: COLORS.dark, fontWeight: 'bold'}}>
              Featured
            </Text>
            <Text style={{color: COLORS.grey, fontWeight: 'thin'}}>
              Show all
            </Text>
          </View>
          {/*  */}
          {/*  */}
          <ScrollView horizontal={false}>
            {availableHouses.map((house, index) => (
              <TouchableHighlight key={index}>
                <Pressable
                  onPress={() => navigation.navigate('DetailsScreen', house)}>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      padding: 10,
                      marginVertical: 5,
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      overflow: 'hidden',
                      shadowColor: COLORS.grey,
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.27,
                      shadowRadius: 4.65,
                      elevation: 6,
                    }}>
                    <Image
                      source={{
                        uri: 'https://res.cloudinary.com/djv535hkn/image/upload/v1681872997/nairobiTower_lulx65.jpg',
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 9,
                        marginRight: 10,
                      }}
                    />

                    <View>
                      <Text
                        style={{
                          color: COLORS.dark,
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        {house.title}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.dark,
                          fontWeight: 'bold',
                          marginBottom: 5,
                          opacity: 0.8,
                        }}>
                        {house.location}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
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
                            <Text>{`${feature.number} ${feature.name}`}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </Pressable>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
        {/*  */}

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Select filters:</Text>
              <Text style={styles.modalLabel}>Number of rooms:</Text>
              <View style={styles.modalRow}>
                {/* buttons to select number of rooms */}
              </View>
              <Text style={styles.modalLabel}>Price range:</Text>
              <View style={styles.modalRow}>
                {/* sliders or buttons to select price range */}
              </View>
              <Text style={styles.modalLabel}>Location:</Text>
              <View style={styles.modalRow}>
                <Picker
                  selectedValue={selectedCity}
                  style={{width: 170}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSearchCity(itemValue)
                  }>
                  {counties.map(county => (
                    <Picker.Item
                      key={county.code}
                      label={county.name}
                      value={county.name}
                    />
                  ))}
                </Picker>
              </View>
              <Pressable style={styles.modalButton} onPress={handleFilterApply}>
                <Text style={styles.modalButtonText}>Apply filters</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  inputContainer: {
    height: 50,
    width: 900,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 38,
    width: 38,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  serviceType: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  cardIcon: {
    marginRight: 5,
    fontSize: 20,
    color: '#000',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activeServiceType: {
    backgroundColor: COLORS.grey,
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  //
  //
  //
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 255,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
