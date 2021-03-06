/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Modal, Keyboard} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {SvgXml} from 'react-native-svg';
import moment from 'moment';

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
  DatePickerCommandsContainer,
  DatePickerCommandsButton,
  DatePickerCommandText,
} from './styles';

const DatePickerSelect = ({
  error,
  keyboardType = 'default',
  label,
  value,
  getValue,
  handleBlur,
  initiaValue = '',
  width,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const inputRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setModalVisible(true);
    Keyboard.dismiss();
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    handleBlur(selectedValue ? moment(selectedValue).format('DD/MM/YYYY') : '');
  }, [handleBlur, selectedValue]);

  const handleSelectValue = useCallback(() => {
    if (selectedValue) {
      setModalVisible(false);
      setIsFocused(false);
    }

    if (!selectedValue) {
      setSelectedValue(new Date());
      setModalVisible(false);
      setIsFocused(false);
    }
  }, [selectedValue]);

  const handleGetValue = useCallback(
    val => {
      getValue(val);
    },
    [getValue],
  );

  useEffect(() => {
    const selectedDate = selectedValue
      ? moment(selectedValue).format('DD/MM/YYYY')
      : '';
    inputRef.current.value = selectedDate;
    handleGetValue(selectedDate);
  }, [selectedValue, handleGetValue]);

  useEffect(() => {
    if (initiaValue) {
      const [day, month, year] = initiaValue.split('/');
      console.log(day, month, year);
      const newDate = new Date();
      newDate.setDate(day);
      newDate.setMonth(month - 1);
      newDate.setFullYear(year);
      console.log(moment(newDate).format('DD/MM/YYYY'));
      setSelectedValue(newDate);
    }
  }, [initiaValue]);

  return (
    <Container isFocused={isFocused} error={error} width={width}>
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
          value={
            selectedValue ? moment(selectedValue).format('DD/MM/YYYY') : ''
          }
        />
        <AuxIcon type={'grey'} icon={'date'} width={20} height={20} />
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
            <DatePicker
              date={selectedValue ? selectedValue : new Date()}
              onDateChange={val => {
                setSelectedValue(val);
              }}
              mode="date"
              textColor={colors.white}
              fadeToColor={colors.darkGrey}
              locale="pt-br"
            />
            <DatePickerCommandsContainer>
              <DatePickerCommandsButton onPress={() => handleSelectValue()}>
                <DatePickerCommandText>OK</DatePickerCommandText>
              </DatePickerCommandsButton>
            </DatePickerCommandsContainer>
          </PickerContainer>
        </ModalPicker>
      </Modal>
    </Container>
  );
};

export default DatePickerSelect;
