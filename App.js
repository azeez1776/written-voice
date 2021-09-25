import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Voice from '@react-native-community/voice';

export default function App() {

  const [result, setResult] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler", e)
  }
  const onSpeechEndHandler = (e) => {
    // setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    // setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }
  const check = async () => {
    const value = await Voice.isAvailable();
    console.log(value);
  }

  check();


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={require('./assets/voice.png')} />
        <Text style={styles.textTitle}>WRITTEN VOICE</Text>
      </View>
      <View style={styles.text}>
        <TextInput
          placeholder={"The text goes here"}
          placeholderTextColor="#000"
          style={styles.textInput}
          numberOfLines={15}
          editable={false}
          multiline={true}
          value={result}
          onChangeText={text => setResult(text)}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.start}
          onPress={startRecording}
        >
          <Text style={styles.startText}>START RECORDING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stop}
          onPress={stopRecording}
        >
          <Text style={styles.stopText}>STOP RECORDING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.download}>
          <Text style={styles.downText}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  startText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    textAlign: 'center'
  },
  stopText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    textAlign: 'center'
  },
  downText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: verticalScale(2)
  },
  start: {
    justifyContent: 'center',
    backgroundColor: '#011627',
    width: scale(200),
    height: verticalScale(45),
    borderRadius: 7
  },
  stop: {
    justifyContent: 'center',
    backgroundColor: '#E71D36',
    width: scale(200),
    height: verticalScale(45),
    borderRadius: 7
  },
  download: {
    justifyContent: 'center',
    backgroundColor: '#FF9F1C',
    width: scale(200),
    height: verticalScale(45),
    borderRadius: 7
  },
  container: {
    flex: 1,
    backgroundColor: '#2EC4B6',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
  },
  text: {
    flex: 3,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 2,
    width: scale(300),
    height: verticalScale(300),
    textAlignVertical: 'top',
    padding: 0,
    borderRadius: 7,
    padding: moderateScale(10),
    color: 'black'
  }
});
