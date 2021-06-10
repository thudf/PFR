import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';

import checkboxOn from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/checkbox_on.svg';
import checkboxOff from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/checkbox_off.svg';

import {Button, Container, Label} from './styles';

const CheckBox = ({onChange}) => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    onChange(checked);
  }, [checked, onChange]);

  return (
    <Container>
      <Button onPress={() => setChecked(!checked)}>
        {checked ? (
          <SvgXml xml={checkboxOn} width={18} height={18} />
        ) : (
          <SvgXml xml={checkboxOff} width={18} height={18} />
        )}
        <Label checked={checked}>
          Concordo com os termos do uso e com a LGPD.
        </Label>
      </Button>
    </Container>
  );
};

export default CheckBox;
