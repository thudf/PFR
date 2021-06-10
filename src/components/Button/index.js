import React from 'react';
import {SvgXml} from 'react-native-svg';

import instagram from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/instagram.svg';
import facebook from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/facebook.svg';
import arrowRight from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_right.svg';
import key from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/key.svg';

import {Container, ButtonText, Icon} from './styles';

const Button = ({
  type = '',
  children,
  icon,
  active = true,
  buttonColor,
  textColor,
  ...rest
}) => {
  return (
    <Container active={active} buttonColor={buttonColor} {...rest}>
      {icon && <Icon name={icon} size={20} color={textColor} />}
      {type === 'insta' && (
        <SvgXml
          style={{marginRight: 7}}
          xml={instagram}
          width={17}
          height={17}
        />
      )}
      {type === 'face' && (
        <SvgXml
          style={{marginRight: 7}}
          xml={facebook}
          width={17}
          height={17}
        />
      )}
      {type === 'changePassword' && (
        <SvgXml style={{marginRight: 7}} xml={key} width={26} height={20} />
      )}
      <ButtonText textColor={textColor}>{children}</ButtonText>
      {type === 'avançar' && (
        <SvgXml
          style={{marginLeft: 7}}
          xml={arrowRight}
          width={17}
          height={17}
        />
      )}
    </Container>
  );
};

export default Button;
