import React from 'react';

import {
  ModalSelection,
  ModalContainer,
  ModalCard,
  ModalTitle,
  ModalOption,
  ModalButtonText,
  ModalButton,
} from './styles';

const PhotoSelectionModal = ({
  visible,
  setVisible,
  getImage,
  title = 'Selecione uma foto de perfil',
}) => {
  return (
    <ModalSelection
      animationType="fade"
      visible={visible}
      transparent
      callback={data => {
        setVisible(false);

        if (data) {
          requestAnimationFrame(() => {
            getImage(data);
          });
        }
      }}>
      <ModalContainer>
        <ModalCard>
          <ModalTitle>{title}</ModalTitle>
          <ModalOption
            onPress={() => {
              setVisible(false);

              requestAnimationFrame(() => {
                getImage('Tirar foto');
              });
            }}>
            <ModalButtonText>{'Tirar foto'}</ModalButtonText>
          </ModalOption>
          <ModalOption
            onPress={() => {
              setVisible(false);

              requestAnimationFrame(() => {
                getImage('Selecionar da galeria');
              });
            }}>
            <ModalButtonText>{'Selecionar da galeria'}</ModalButtonText>
          </ModalOption>
          <ModalButton onPress={() => setVisible(false)}>
            <ModalButtonText>{'CANCELAR'}</ModalButtonText>
          </ModalButton>
        </ModalCard>
      </ModalContainer>
    </ModalSelection>
  );
};

export default PhotoSelectionModal;
