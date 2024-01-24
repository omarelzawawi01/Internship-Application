import { ImageBackground, StyleSheet ,View,} from "react-native";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
function BackGround({ children}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  // if (!isImageLoaded) {
  //   return <LoadingOverlay message="Loading..." />;
  // }
  return (
    // <View style={{flex:1,height:'100%',width:'100%'}} >

    <ImageBackground
      source={require("../assets/home.png")}
      style={styles.backgroundImage}
      blurRadius={2} // Adjust the blur intensity as needed
      onLoad={handleImageLoad}
      ></ImageBackground>
    // {isImageLoaded ? children : <LoadingOverlay message="Loading..." />}
    //   </View>
  );
}
export default BackGround;
const styles = StyleSheet.create({
          backgroundImage: {
                    flex: 1,
                    resizeMode: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: -1,
                  },
          });

