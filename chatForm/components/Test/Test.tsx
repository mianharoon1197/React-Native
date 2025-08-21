import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Chat() {
  return (//real chat bubble design
    <ImageBackground
      source={require('../../assets/bgImage.jpg')}
      resizeMode="cover"
      style={styles.bgImg}
    >
      <View style={styles.container}>
        
        <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
          <View style={[styles.messageBubble, styles.messageBubbleRight]}>
            <Text style={styles.messageText}>Fine 🙂</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:15</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={18}
                color="#34b7f1"
              />
            </View>
          </View>
          <View style={[styles.cornerTail, styles.tailRight]} />
        </View>

        <View
          style={[
            styles.bubbleWrapper,
            styles.bubbleWrapperRight,
            { right: 15, borderTopRightRadius: 5 },
          ]}
        >
          <View
            style={[
              styles.messageBubble,
              styles.messageBubbleRight,
              { borderTopRightRadius: 10 },
            ]}
          >
            <Text style={styles.messageText}>Thank you 🙂</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:15</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={18}
                color="#34b7f1"
              />
            </View>
          </View>
        </View>

        <View style={[styles.bubbleWrapper, { marginTop: 10 }]}>
          <View style={[styles.cornerTail, styles.tailLeft]} />
          <View style={[styles.messageBubble, styles.messageBubbleLeft]}>
            <Text style={styles.messageText}>Good 👍 see you 😊</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:15</Text>
              {/* <Ionicons name="checkmark-done-outline" size={18} color="#34b7f1" /> */}
            </View>
          </View>
        </View>

        <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
          <View style={[styles.messageBubble, styles.messageBubbleRight]}>
            <Text style={styles.messageText}>😍😍 by</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:16</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={18}
                color="#34b7f1"
              />
            </View>
          </View>
          <View style={[styles.cornerTail, styles.tailRight]} />
        </View>
        <View style={[styles.bubbleWrapper, { marginTop: 10 }]}>
          <View style={[styles.cornerTail, styles.tailLeft]} />

          <View style={[styles.messageBubble, styles.messageBubbleLeft]}>
            <Text style={styles.messageText}>Take care 😘😘</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:16</Text>
            </View>
          </View>
        </View>
        <View style={styles.bubbleWrapper}>
          <View
            style={[
              styles.messageBubble,
              styles.messageBubbleLeft,
              { left: 12, borderTopLeftRadius: 10 },
            ]}
          >
            <Text style={styles.messageText}>🙂🙂</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:18</Text>
            </View>
          </View>
        </View>
        <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
          <View style={[styles.messageBubble, styles.messageBubbleRight]}>
            <Text style={styles.messageText}>❤️❤️🧡💛💚💜</Text>
            <View style={styles.bubbleInfo}>
              <Text style={styles.timeText}>11:19</Text>
              <Ionicons name="checkmark-done-outline" size={18} color="gray" />
            </View>
          </View>
          <View style={[styles.cornerTail, styles.tailRight]} />
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
    paddingHorizontal: 15,
  },
  bubbleWrapper: {
    top: 70,
    marginBottom: 5,
    right: 0,
    flexDirection: 'row',
  },
  bubbleWrapperRight: {
    alignSelf: 'flex-end',
  },

  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  messageBubbleRight: {
    backgroundColor: '#DCF8C6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageBubbleLeft: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageText: {
    fontSize: 16,
    flexShrink: 1,
  },
  bubbleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 5,
    gap: 5,
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
  cornerTail: {
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderLeftWidth: 13,
    borderLeftColor: 'transparent',
    alignSelf: 'flex-start',
    marginTop: -1,
  },
  tailLeft: {
    //transform: [{ rotate: '0deg' }],
    marginTop: 0,
    borderTopColor: '#fff',
  },
  tailRight: {
    transform: [{ rotate: '-90deg' }],
    borderTopColor: '#DCF8C6',
  },
});
