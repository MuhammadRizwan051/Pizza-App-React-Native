import {View, Text} from 'react-native';
import React from 'react';
import style from '../styling';

const Favourites = () => {
  let list = [
    [
      {
        detail: 'emrl;kmre',
        id: '-NKlrWQLiBIiXzl8uKe_',
        name: 'oprekmer,ler',
        price: ',er;lre,',
        quantity: 3,
        specialInstruction: '',
        src: 'https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg',
      },
    ],
    [
      {
        detail: 'Ldndlsns',
        id: '-NKhk_FLBiwg7fHNZ8Hl',
        name: 'Nnn',
        price: ',94 49',
        quantity: 1,
        specialInstruction: '',
        src: 'file:///data/user/0/com.pizzaapp/cache/rn_image_picker_lib_temp_b033d633-fa09-4d4c-a4a0-e77758218090.jpg',
      },
    ],
  ];

  return (
    <>
      <View style={[style.bgDark, {paddingVertical: 10}]}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Favourites
        </Text>
      </View>
    </>
  );
};

export default Favourites;
