import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
    <View style={styles.container}>
      <Text>Testando</Text>
    </View>
    )
  }

  if (hasPermission === false){
    <Text>Acesso negado</Text>
  }

  async function takePicture(){
    if (camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)
      setOpen(true)
      console.log(data)
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView  style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      ref={camRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <FontAwesome name='exchange' size={23} color={"red"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPicture}
            onPress={takePicture}
          >
            <FontAwesome name='camera' size={23} color={"white"}/>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto && (
        <Modal
        animationType='slice'
        transparent={true}
        visible={open}
      >
        <TouchableOpacity style={styles.closeButton}
            onPress={() => {setOpen(false)}}
          >
            <FontAwesome name='window-close' size={23} color={"white"}/>
          </TouchableOpacity>
        <View style={styles.contentModal}>
          <Image style={styles.imgPhoto} source={{uri: capturedPhoto}}/>
        </View>
      </Modal>
      )}
      
      </SafeAreaView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width:"100%",
    height:"100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  button:{
    position:"absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin:20,
    width:50,
    height:50,
    borderRadius: 30,

  },
  buttonPicture: {
    position:"absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  contentModal: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    margin:20,
  },
  closeButton: {
    position:'absolute',
    top:10,
    left:2,
    margin:10,
  },
  imgPhoto: {
    width:'100%',
    height:400,

  }

});
