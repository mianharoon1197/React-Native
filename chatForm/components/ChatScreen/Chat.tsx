import { View, Text, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatBubble() {
  return (
    <ImageBackground
      source={require('../../assets/bgImage.jpg')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={{ paddingHorizontal: 15, paddingTop: 70 }}>
        {/*  *******  1 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              backgroundColor: '#DCF8C6',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderTopRightRadius: 0,
              borderRadius: 7,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontSize: 18,

                flexWrap: 'wrap',
              }}
            >
              I'm Fine 🙂 and how are you and fo r your kind info I'm going to
              home and come ba ck
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                000000
              </Text>
            </Text>

            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 13 }}>11:13</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={16}
                color="#34b7f1"
                style={{
                  marginLeft: 4,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              borderWidth: 8,
              alignSelf: 'flex-start',
              marginVertical: 3,
              marginLeft: -1,
              marginTop: 4,
              borderTopColor: '#DCF8C6',
              borderLeftColor: '#DCF8C6',
              borderBottomColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          ></View>
        </View>
        {/*  *******  2 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              backgroundColor: '#DCF8C6',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 7,
              marginRight: 12,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              I'm Fine 🙂 and
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                000000
              </Text>
            </Text>

            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 13 }}>11:13</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={16}
                color="#34b7f1"
                style={{
                  marginLeft: 4,
                }}
              />
            </View>
          </View>
        </View>
        {/*  *******  3 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          <View
            style={{
              width: 0,
              height: 0,
              borderWidth: 8,
              alignSelf: 'flex-start',
              marginVertical: 4,
              marginLeft: 1,
              borderTopColor: '#fff',
              borderLeftColor: 'transparent',
              borderRightColor: '#fff',
              borderBottomColor: 'transparent',
            }}
          ></View>
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              flexWrap: 'wrap',
              backgroundColor: '#fff',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderTopStartRadius: 0,
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Good 👍 to see you 😊 and for yo u r kind info, Im going to Lahore
              this week end with him
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                00000
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                position: 'absolute',
                bottom: 3,
                right: 20,
                paddingLeft: 0,
                marginLeft: 0,
              }}
            >
              11:15
            </Text>
          </View>
        </View>
        {/*  *******  4 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              backgroundColor: '#DCF8C6',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderTopRightRadius: 0,
              borderRadius: 7,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontSize: 18,

                flexWrap: 'wrap',
              }}
            >
              😍😍 by
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                000000
              </Text>
            </Text>

            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 13 }}>11:13</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={16}
                color="#34b7f1"
                style={{
                  marginLeft: 4,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              borderWidth: 8,
              alignSelf: 'flex-start',
              marginVertical: 3,
              marginLeft: -1,
              marginTop: 4.5,
              borderTopColor: '#DCF8C6',
              borderLeftColor: '#DCF8C6',
              borderBottomColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          ></View>
        </View>
        {/*  *******  5 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          <View
            style={{
              width: 0,
              height: 0,
              borderWidth: 8,
              alignSelf: 'flex-start',
              marginVertical: 4,
              marginLeft: 1,
              borderTopColor: '#fff',
              borderLeftColor: 'transparent',
              borderRightColor: '#fff',
              borderBottomColor: 'transparent',
            }}
          ></View>
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              backgroundColor: '#fff',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderTopStartRadius: 0,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Take care 😘😘
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                00000
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                position: 'absolute',
                bottom: 3,
                right: 20,
                paddingLeft: 0,
                marginLeft: 0,
              }}
            >
              11:16
            </Text>
          </View>
        </View>
        {/*  *******  6 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          <View
            style={{
              maxWidth: '80%',
              flexWrap: 'wrap',
              backgroundColor: '#fff',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 8,
              marginLeft: 15,
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              😊😊 Hello I'm Haroon from
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                00000
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                position: 'absolute',
                bottom: 3,
                right: 20,
                paddingLeft: 0,
                marginLeft: 0,
              }}
            >
              11:18
            </Text>
          </View>
        </View>
        {/*  *******  7 BUBBLE  ************ */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/*---------------------------------------------------------------- */}
          <View
            style={{
              maxWidth: '80%',
              backgroundColor: '#DCF8C6',
              marginVertical: 4,
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderTopRightRadius: 0,
              borderRadius: 7,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontSize: 18,

                flexWrap: 'wrap',
              }}
            >
              🩷🧡💛🩵💜
              <Text style={{ width: 10, height: 10, color: 'transparent' }}>
                000000
              </Text>
            </Text>

            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 13 }}>11:13</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={16}
                color="gray"
                style={{
                  marginLeft: 4,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              borderWidth: 8,
              alignSelf: 'flex-start',
              marginVertical: 3,
              marginLeft: -1,
              marginTop: 4,
              borderTopColor: '#DCF8C6',
              borderLeftColor: '#DCF8C6',
              borderBottomColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          ></View>
        </View>
      </View>
    </ImageBackground>
  );
}
