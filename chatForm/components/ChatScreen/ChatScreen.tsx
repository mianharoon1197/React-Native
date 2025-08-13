import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatMessage() {
  return (
    <ImageBackground
      source={require('../../assets/bgImage.jpg')}
      resizeMode="cover"
      style={styles.bgImg}
    >
      <View style={styles.container}>
        <View style={[styles.bubble, styles.bubbleRight]}>
          <Text style={styles.messageText}>Fine 😊</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:13</Text>
            <Ionicons name="checkmark-done-outline" size={18} color="#34b7f1" />
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleRight]}>
          <Text style={styles.messageText}>Thank you</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:13</Text>
            <Ionicons name="checkmark-done-outline" size={18} color="#34b7f1" />
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleLeft, { marginTop: 10 }]}>
          <Text style={[styles.messageText, styles.messageTextLeft]}>
            Good 👍 see you 😊
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:15</Text>
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleRight]}>
          <Text style={styles.messageText}>😍😍 bye</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:16</Text>
            <Ionicons name="checkmark-done-outline" size={18} color="#34b7f1" />
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleLeft, { marginTop: 10 }]}>
          <Text style={[styles.messageText, styles.messageTextLeft]}>
            Take care 😘😘
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:16</Text>
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleLeft]}>
          <Text style={[styles.messageText, styles.messageTextLeft]}>😊😊</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:18</Text>
          </View>
        </View>

        <View style={[styles.bubble, styles.bubbleRight]}>
          <Text style={styles.messageText}>❤️🧡💛💚💜</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.timestamp}>11:19</Text>
            <Ionicons
              name="checkmark-done-outline"
              size={18}
              color="#686a6bff"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 7,
    marginBottom: 5,
    position: 'relative',
  },
  bubbleRight: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  bubbleLeft: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    paddingRight: 60,
  },
  messageTextLeft: {
    paddingRight: 40,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});
