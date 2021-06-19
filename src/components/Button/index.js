/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';

import instagram from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/instagram.svg';
import facebook from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/facebook.svg';
import arrowRight from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_right.svg';
import key from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/key.svg';
import chat from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/add_chat.svg';
import clipboard from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/clipboard.svg';
import phone from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/fone.svg';
import route from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/route_right.svg';

import {Container, ButtonText, Icon} from './styles';

const Button = ({
  type = '',
  children,
  icon,
  active = true,
  buttonColor,
  textColor,
  small = false,
  ...rest
}) => {
  const leftIconTypeList = [
    'read_more',
    'chat',
    'insta',
    'face',
    'changePassword',
    'phone',
    'route',
  ];

  const leftIconTypes = {
    read_more: {
      icon: clipboard,
      width: 17,
      height: 17,
      marginRight: 7,
    },
    chat: {
      icon: chat,
      width: 17,
      height: 17,
      marginRight: 7,
    },
    insta: {
      icon: instagram,
      width: 17,
      height: 17,
      marginRight: 7,
    },
    face: {
      icon: facebook,
      width: 17,
      height: 17,
      marginRight: 7,
    },
    changePassword: {
      icon: key,
      width: 26,
      height: 20,
      marginRight: 7,
    },
    phone: {
      icon: phone,
      width: 17,
      height: 17,
      marginRight: 3,
    },
    route: {
      icon: route,
      width: 20,
      height: 20,
      marginRight: 3,
    },
  };

  return (
    <Container
      active={active}
      buttonColor={buttonColor}
      small={small}
      {...rest}>
      {icon && <Icon name={icon} size={20} color={textColor} />}
      {type !== '' && leftIconTypeList.includes(type) && (
        <SvgXml
          style={{marginRight: leftIconTypes[type].marginRight}}
          xml={leftIconTypes[type].icon}
          width={leftIconTypes[type].width}
          height={leftIconTypes[type].height}
        />
      )}
      {/* {type === 'read_more' && (
        <SvgXml
          style={{marginRight: 7}}
          xml={clipboard}
          width={17}
          height={17}
        />
      )}
      {type === 'chat' && (
        <SvgXml style={{marginRight: 7}} xml={chat} width={17} height={17} />
      )}
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
      )} */}
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
