import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

function MainContent() {
  const [selected, setSelected] = useState(false);
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View style={[styles.container, { marginTop: isLandscape ? -45 : -170 }]}>
      <Text style={styles.company}>Company Name</Text>
      <Text style={styles.companyName}>J&J Systematic Machine Co.</Text>

      <Text style={styles.company}>Company Registration No.</Text>
      <Text style={styles.companyName}>CUIN 03020102</Text>

      <Text style={styles.company}>Company Address</Text>
      <View style={styles.companyAddress}>
        <Text style={styles.addressNum}>Address</Text>
        <Ionicons name="caret-down-outline" size={13} color="#00b7ff" />
      </View>

      <Text style={styles.company}>Company Contact No.</Text>
      <View style={styles.companyAddress}>
        <Text style={styles.addressNum}>+62</Text>
        <Ionicons name="caret-down-outline" size={13} color="#00b7ff" />
        <Text style={styles.contactNum}>3061234567</Text>
      </View>

      <Pressable style={styles.row} onPress={() => setSelected(!selected)}>
        <View style={[styles.circle, selected && styles.selected]} />
        <Text style={styles.text}>
          Does Your Company Supply machinery/equipment?
        </Text>
      </Pressable>

      <View style={styles.lineGroup}>
        <View style={styles.verticalLine} />
        <View style={[styles.horizontalLine, styles.topLine]} />
        <View style={[styles.horizontalLine, styles.bottomLine]} />

        <View style={styles.textBlock}>
          <View style={styles.rightText}>
            <Ionicons name="ellipse" size={13} color="#00b7ff" />
            <Text style={styles.text}>Same as above address</Text>
          </View>
          <View style={styles.billingAddress}>
            <Text style={styles.billing}>Company Billing Address</Text>
            <Text style={styles.cNumber}>CUIN 01020102</Text>
          </View>
        </View>
      </View>

      <Text style={styles.positionText}>Position</Text>
      <Text style={styles.superviserText}>Supervisor</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>EDIT</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={['#33bbee', '#3388ee', '#0035fc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveBtn}
        >
          <TouchableOpacity style={styles.saveBtnInner}>
            <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  company: {
    fontSize: 12,
    color: '#222',
    marginTop: 20,
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
  },
  companyAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  addressNum: {
    color: '#666',
    marginLeft: 3,
  },
  contactNum: {
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 5,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 4,
    borderColor: '#00b7ff',
    marginRight: 2,
  },
  selected: {
    borderColor: '#003e56',
  },
  lineGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    left: 5,
  },
  verticalLine: {
    marginTop: 10,
    width: 2,
    height: 65,
    backgroundColor: 'black',
  },
  horizontalLine: {
    width: 6,
    height: 2,
    left: -2,
    backgroundColor: 'black',
    position: 'absolute',
  },
  topLine: {
    top: 14,
  },
  bottomLine: {
    top: 43,
  },
  textBlock: {
    marginLeft: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    marginVertical: 3,
  },
  rightText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
    flexWrap: 'wrap',
  },
  billingAddress: {
    marginLeft: 3,
  },
  billing: {
    fontSize: 12,
  },
  cNumber: {
    fontSize: 13,
    marginTop: 5,
  },
  positionText: {
    fontSize: 12,
    marginTop: 20,
  },
  superviserText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 60,
    flexWrap: 'wrap',
    gap: 15,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editBtnText: {
    fontSize: 16,
  },
  saveBtn: {
    borderRadius: 50,
  },
  saveBtnInner: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MainContent;
