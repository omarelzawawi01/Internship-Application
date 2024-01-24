import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BackGround from "../components/BackGround";
import { FlatList, Image } from "react-native";
import ImageItem from "../components/ImageComponents/ImageItem.js";
import { use } from "i18next";
import NetInfo from "@react-native-community/netinfo";
import LanPortScanner from "react-native-lan-port-scanner";
function ImagesScreen() {
  const [numColumns, setNumColumns] = useState(2); // State to control numColumns
  const images = [
    {
      key: 1,
      uri: "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMHIspMtwZaiEt5yPew03zhRc2wubqA7fQbmpOJUPYwghTBsN5xsy2dEhev5HFhLHnd7pOXqZYoOaD8JiXvBChv",
      text: "Porsche 911 GT3 RS",
    },
    {
      key: 2,
      uri: "https://hips.hearstapps.com/hmg-prod/images/2024-ferrari-sf90-xx-stradale-v5-105-649c481621d10.jpg?crop=1xw:1xh;center,top&resize=980:*",
      text: "Ferrari SF90 XX Stradale",
    },
    {
      key: 3,
      uri: "https://www.topgear.com/sites/default/files/2022/03/mansory-ferrari-f8-spider-01.jpg?w=892&h=502",
      text: "Mansory Ferrari F8 Spider",
    },
    {
      key: 4,
      uri: "https://www.topgear.com/sites/default/files/2022/07/1-Ferrari-Daytona-SP3.jpg?w=892&h=502",
      text: "Ferrari Daytona SP3",
    },
    {
      key: 5,
      uri: "https://www.topgear.com/sites/default/files/cars-car/carousel/2020/10/porsche_918_2.jpg?w=892&h=502",
      text: "Porsche 918 Spyder",
    },
    {
      key: 6,
      uri: "https://www.topgear.com/sites/default/files/images/news-article/carousel/2016/11/dbd29482648d11a5005c0abad1742529/s-l1600-5.jpg?w=892&h=502",
      text: "Porsche 917",
    },
    {
      key: 7,
      uri: "https://upload.wikimedia.org/wikipedia/commons/8/81/Ferrari-330p3-2.jpg",
      text: "Ferrari 330 P3",
    },
    {
      key: 8,
      uri: "https://www.topgear.com/sites/default/files/cars-car/carousel/2017/05/row_0410_copy.jpg?w=892&h=502",
      text: "Ford GT",
    },
    {
      key: 9,
      uri: "https://www.topgear.com/sites/default/files/cars-car/carousel/2015/02/buyers_guide_-_laf_-_front.jpg?w=892&h=502",
      text: "Ferrari LaFerrari",
    },
    {
      key: 10,
      uri: "https://www.topgear.com/sites/default/files/cars-car/carousel/2015/02/buyers_guide_-_mclaren_p1_2014_-_front_quarter.jpg?w=892&h=502",
      text: "McLaren P1",
    },
    {
      key: 11,
      uri: "https://www.topgear.com/sites/default/files/images/news-article/carousel/2020/12/9ff3b69d8eaf8a226574d8e2eddb5158/hempel_porsche_gt3cup_car2car_2291.jpg?w=892&h=502",
      text: "Porsche 911 GT3 Cup",
    },
    {
      key: 12,
      uri: "https://www.topgear.com/sites/default/files/2021/07/01%209fe7aef8bdc7933d_org.jpg?w=892&h=502",
      text: "Koenigsegg Jesko",
    },
  ];

  // Function to change the number of columns and force a re-render
  const changeNumColumns = (newNumColumns) => {
    setNumColumns(newNumColumns);
  };
  async function getNetworkInfo() {
    const networkInfo = await LanPortScanner.getNetworkInfo();    
    console.log(networkInfo);
  }
  useEffect(() => {
    changeNumColumns(2);
    getNetworkInfo();
  }, []);
  return (
    <View style={styles.container}>
      <BackGround />
      <View>
        <SafeAreaView>
          <Text style={styles.Title}>Images Screen</Text>
          <FlatList
            key={numColumns} // Change the key when numColumns changes
            data={images}
            keyExtractor={(item) => item.key}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <ImageItem uri={item.uri} text={item.text} />
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default ImagesScreen;

const styles = StyleSheet.create({
  Title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
