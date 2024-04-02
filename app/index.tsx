import { isStepCountingSupported, parseStepData, startStepCounterUpdate, stopStepCounterUpdate } from "@dongminyu/react-native-step-counter";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function IndexPage() {

  const [supported, setSupported] = useState(false)
  const [granted, setGranted] = useState(false)
  const [steps, setSteps] = useState(0)
  const [_state, _setState] = useState(0)

  const askPermission = () => {
    isStepCountingSupported().then((result) => {
      console.log('🚀 - isStepCountingSupported', result);
      setGranted(result.granted === true);
      setSupported(result.supported === true);
    })
  }

  const startStepCounter = () => {
    startStepCounterUpdate(new Date(), (data) => {
      const parsedData = parseStepData(data);
      console.log(parsedData);
      setSteps(parsedData.steps);
    });
  }

  const stopStepCounter = () => {
    stopStepCounterUpdate();
  }

  const _press = async () => {
    if (_state === 0) {
      if (!supported || !granted) {
        askPermission();
      } else {
        startStepCounter();
        _setState(1);
      }
    } else if (_state === 1) {
      stopStepCounter();
      _setState(0);
    }
  }

  return (
    <View style={styles.main}>

      <Text style={styles.text}>{steps}</Text>

      <Pressable style={styles.button} onPress={_press}>
        <Text style={styles.text2}>Press me</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },
  text2: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
})