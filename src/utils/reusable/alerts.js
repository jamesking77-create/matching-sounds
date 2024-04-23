import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, message, icon, onDismiss }) => {
  useEffect(() => {
    let timeout;
    if (visible) {
      timeout = setTimeout(() => {
        onDismiss();
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [visible, onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.message}>{message}</Text>
          <Image source={icon} style={styles.icon} />
        </View>
      </View>
    </Modal>
  );
};

const CorrectAlert = ({ visible, onDismiss }) => (
  <CustomAlert
    visible={visible}
    message="Correct!"
    icon={require('../../../assets/images/check_6785304.png')}
    onDismiss={onDismiss}
  />
);

const WrongAlert = ({ visible, onDismiss }) => (
  <CustomAlert
    visible={visible}
    message="Wrong!"
    icon={require('../../../assets/images/no_11560478.png')}
    onDismiss={onDismiss}
  />
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 28,
    marginBottom: 20,
    color:'white'
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  dismissButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  dismissText: {
    color: 'white',
    fontSize: 16,
  },
});

export { CorrectAlert, WrongAlert };
