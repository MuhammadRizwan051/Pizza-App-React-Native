// import React, { useCallback, useMemo, useRef } from 'react';
import 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

const Favourites = () => {
  // ref
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%"]

  function handlePresentModal() {
    bottomSheetModalRef.current?.present()
  }

  // variables
  // const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});