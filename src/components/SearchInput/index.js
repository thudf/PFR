import React, {useState, useCallback} from 'react';
import {SvgXml} from 'react-native-svg';

import {colors} from '../../global';
import searchIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/search_icon.svg';

import {Container, TextInput, Content} from './styles';

const SearchInput = ({
  keyboardType = 'default',
  handleBlur,
  handleFilter,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    handleBlur && handleBlur();
  }, [handleBlur]);

  return (
    <Container isFocused={isFocused}>
      <Content>
        <TextInput
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholderTextColor={colors.softGrey}
          keyboardType={keyboardType}
          keyboardAppearance="dark"
          onChangeText={e => handleFilter(e)}
        />

        <SvgXml xml={searchIcon} width={18.5} height={18.5} />
      </Content>
    </Container>
  );
};

export default SearchInput;
