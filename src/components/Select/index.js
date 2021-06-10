/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Modal, Keyboard} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {colors} from '../../global';
import AuxIcon from '../../components/AuxIcon';

import warn from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/warn.svg';

import {
  Container,
  Content,
  TextInput,
  ErrorText,
  Label,
  LabelText,
  ModalPicker,
  ModalPickerClose,
  PickerContainer,
  PickerScroll,
  PickerItem,
  PickerItemLabel,
} from './styles';

const Select = ({
  error,
  keyboardType = 'default',
  label,
  value,
  getValue,
  options,
  handleBlur,
  initiaValue = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setModalVisible(true);
    Keyboard.dismiss();
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    handleBlur(selectedValue);
  }, [handleBlur, selectedValue]);

  const handleSelectValeu = useCallback(val => {
    setSelectedValue(val);
    setModalVisible(false);
    setIsFocused(false);
  }, []);

  const handleGetValue = useCallback(
    val => {
      getValue(val);
    },
    [getValue],
  );

  useEffect(() => {
    inputRef.current.value = selectedValue;
    handleGetValue(selectedValue);
  }, [selectedValue, handleGetValue]);

  useEffect(() => {
    if (modalVisible && selectedValue) {
      const optionIndex = options.findIndex(
        option => option.value === selectedValue,
      );

      if (optionIndex > 5) {
        scrollRef.current.scrollTo({
          y: optionIndex * 43,
          animated: false,
        });
      }
    }
  }, [modalVisible, selectedValue, options]);

  useEffect(() => {
    if (initiaValue) {
      handleSelectValeu(initiaValue);
    }
  }, [initiaValue, handleSelectValeu]);

  return (
    <Container isFocused={isFocused} error={error}>
      <Label>
        {!error && selectedValue !== '' && <LabelText>{label}</LabelText>}
        {error && !modalVisible && (
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
        <TextInput
          {...rest}
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholderTextColor={colors.softGrey}
          showSoftInputOnFocus={false}
          value={selectedValue}
        />
        <AuxIcon type={'grey'} icon={'chevronDown'} width={20} height={20} />
      </Content>
      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalVisible}
        animationType="none">
        <ModalPicker>
          <ModalPickerClose
            onPress={() => {
              setModalVisible(false);
              setIsFocused(false);
            }}
          />
          <PickerContainer>
            <PickerScroll
              ref={scrollRef}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {options.map(option => (
                <PickerItem
                  key={option.value}
                  selected={selectedValue === option.value}
                  onPress={() => handleSelectValeu(option.value)}>
                  <PickerItemLabel>{option.label}</PickerItemLabel>
                </PickerItem>
              ))}
            </PickerScroll>
          </PickerContainer>
        </ModalPicker>
      </Modal>
    </Container>
  );
};

export default Select;
