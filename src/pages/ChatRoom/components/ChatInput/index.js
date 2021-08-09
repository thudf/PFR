import React, {useState, useCallback} from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {colors} from '../../../../global';

import SharedContent from '../SharedContent';

import enviarInativo from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-enviar-inativo.svg';
import enviarAtivo from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-enviar-ativo.svg';
import anexarInativo from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-anexar-inativo.svg';
import anexarAtivo from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-anexar-ativo.svg';

import {Container, TextInput, Content} from './styles';

const Input = ({
  handleSendMessage,
  handleAttach,
  sharedContent,
  onDeleteSharedContent,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      <Container isFocused={isFocused || sharedContent}>
        {sharedContent !== '' && (
          <SharedContent
            content={sharedContent}
            deleteSharedContent={() => onDeleteSharedContent()}
          />
        )}

        <Content>
          <TouchableOpacity onPress={() => handleAttach()}>
            <SvgXml
              xml={isFocused || sharedContent ? anexarAtivo : anexarInativo}
              width={12}
              height={21}
            />
          </TouchableOpacity>

          <TextInput
            {...rest}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholderTextColor={colors.softGrey}
            keyboardAppearance="dark"
            placeholder="Mensagem..."
          />

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              handleSendMessage();
            }}>
            <SvgXml
              xml={isFocused || sharedContent ? enviarAtivo : enviarInativo}
              width={27}
              height={27}
            />
          </TouchableOpacity>
        </Content>
      </Container>
    </>
  );
};

export default Input;
