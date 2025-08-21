import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;
function MainContent() {
  const [selected, setSelected] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.company}>Company Name</Text>
      <Text style={styles.companyName}>J&J Systematic Machine Co.</Text>

      <Text style={styles.company}>Company Registration No.</Text>
      <Text style={styles.companyName}>CUIN 03020102</Text>

      <Text style={styles.company}>Company Address</Text>
      <View style={styles.companyAddress}>
        <Text style={styles.addressNum}>Address</Text>
        <Ionicons name="caret-down-outline" size={15} color="#00b7ff" />
      </View>

      <Text style={styles.company}>Company Contact No.</Text>
      <View style={styles.companyAddress}>
        <Text style={styles.addressNum}>+62</Text>
        <Ionicons name="caret-down-outline" size={15} color="#00b7ff" />
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
            <Ionicons name="ellipse" size={15} color="#00b7ff" />
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
   marginTop: isLandscape ? height * 0.01 : height * -0.13,
  },
  company: {
    fontSize: 12,
    color: '#222',
    marginTop: height * 0.02,
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
    flexWrap: 'wrap',
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
    marginTop: height * 0.025,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#00b7ff',
    marginRight: 5,
  },
  selected: {
    borderColor: '#003e56',
  },
  lineGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: height * 0.01,
    left: 4,
  },
  verticalLine: {
    marginTop: 10,
    width: 2,
    height: 60,
    backgroundColor: 'black',
  },
  horizontalLine: {
    width: 10,
    height: 2,
    left: -4,
    backgroundColor: 'black',
    position: 'absolute',
  },
  topLine: {
    top: 15,
  },
  bottomLine: {
    top: 45,
  },
  textBlock: {
    marginLeft: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    marginVertical: 3,
    left: 4,
  },
  rightText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
    fontSize: 14,
    marginTop: 5,
  },
  positionText: {
    fontSize: 12,
    marginTop: height * 0.025,
  },
  superviserText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: height * 0.05,
    flexWrap: 'wrap',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    paddingHorizontal: width * 0.12,
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
    paddingHorizontal: width * 0.04,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MainContent;
