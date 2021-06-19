import React, {useState, useEffect, useCallback, useRef} from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {colors, fonts} from '../../global';
import AuxIcon from '../../components/AuxIcon';

import warn from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/warn.svg';
import lapis from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-lapis.svg';

import {
  Container,
  TextInput,
  Content,
  ErrorText,
  TextInputM,
  Label,
  LabelText,
} from './styles';

const Input = ({
  icon,
  password,
  edit,
  handleEdit,
  error,
  mask = null,
  textAlign = null,
  keyboardType = 'default',
  label,
  value,
  handleBlur,
  editable = true,
  width,
  ...rest
}) => {
  const inputRef = useRef(null);
  const [passwordView, setPasswordView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    handleBlur && handleBlur();
  }, [handleBlur]);

  useEffect(() => {
    setPasswordView(password);
  }, [password]);

  useEffect(() => {
    inputRef.current.setNativeProps({
      style: {
        fontFamily:
          Platform.OS === 'android' ? `${fonts.robotoLight}` : undefined,
      },
    });
  }, [passwordView]);

  return (
    <Container isFocused={isFocused} error={error} width={width}>
      <Label textAlign={textAlign}>
        {!error && value !== '' && <LabelText>{label}</LabelText>}
        {error && (
          <>
            <SvgXml
              xml={warn}
              width={14}
              height={14}
              style={{marginRight: 4, marginTop: 5}}
            />
            <ErrorText>{error}</ErrorText>
          </>
        )}
      </Label>
      <Content>
        {!mask ? (
          <TextInput
            {...rest}
            ref={inputRef}
            textAlign={textAlign}
            secureTextEntry={passwordView}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholderTextColor={colors.softGrey}
            keyboardType={keyboardType}
            value={value}
            editable={editable}
            keyboardAppearance="dark"
          />
        ) : (
          <TextInputM
            {...rest}
            textAlign={textAlign}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            mask={mask}
            placeholderTextColor={colors.softGrey}
            keyboardType={keyboardType}
            value={value}
            editable={editable}
            keyboardAppearance="dark"
          />
        )}

        {password && (
          <TouchableOpacity onPress={() => setPasswordView(!passwordView)}>
            <AuxIcon
              type={isFocused ? 'white' : 'grey'}
              icon={passwordView ? 'eye' : 'eyeOff'}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}

        {edit && (
          <TouchableOpacity onPress={() => handleEdit()}>
            <SvgXml xml={lapis} width={17} height={17} />
          </TouchableOpacity>
        )}

        {!password && icon && (
          <AuxIcon
            type={isFocused ? 'white' : 'grey'}
            icon={icon}
            width={20}
            height={20}
          />
        )}
      </Content>
    </Container>
  );
};

export default Input;
