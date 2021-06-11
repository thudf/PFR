import React from 'react';
import {SvgXml} from 'react-native-svg';

//White icons:
import add_chat_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/add_chat.svg';
import add_folder_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/add_folder.svg';
import arrow_down_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_down.svg';
import arrow_left_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_left.svg';
import arrow_right_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_right.svg';
import arrow_up_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_up.svg';
import clip_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/clip.svg';
import clipboard_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/clipboard.svg';
import date_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/date_white.svg';
import datetime_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/datetime.svg';
import dots_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/dots.svg';
import eye_off_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/eye_off.svg';
import eye_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/eye.svg';
import fone_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/fone.svg';
import info_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/info.svg';
import key_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/key.svg';
import mail_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/mail.svg';
import menu_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/menu.svg';
import route_right_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/route_right.svg';
import trash_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/trash.svg';
import turn_right_white from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/turn_right.svg';

//Grey icons:
import add_chat_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/add_chat.svg';
import add_folder_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/add_folder.svg';
import arrow_down_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/arrow_down.svg';
import arrow_left_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/arrow_left.svg';
import arrow_right_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/arrow_right.svg';
import arrow_up_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/arrow_up.svg';
import chevron_down from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/chevron_down.svg';
import clip_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/clip.svg';
import clipboard_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/clipboard.svg';
import date_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/date_grey.svg';
import datetime_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/datetime.svg';
import dots_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/dots.svg';
import eye_off_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/eye_off.svg';
import eye_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/eye.svg';
import fone_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/fone.svg';
import info_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/info.svg';
import key_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/key.svg';
import mail_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/mail.svg';
import menu_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/menu.svg';
import route_right_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/route_right.svg';
import trash_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/trash.svg';
import turn_right_grey from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/grey/turn_right.svg';

const AuxIcon = ({type, width, height, icon}) => {
  const auxIconsList = {
    white: {
      addChat: add_chat_white,
      addFolder: add_folder_white,
      arrowDown: arrow_down_white,
      arrowLeft: arrow_left_white,
      arrowRight: arrow_right_white,
      arrowUp: arrow_up_white,
      clip: clip_white,
      clipboard: clipboard_white,
      date: date_white,
      datetime: datetime_white,
      dots: dots_white,
      eyeOff: eye_off_white,
      eye: eye_white,
      fone: fone_white,
      info: info_white,
      key: key_white,
      mail: mail_white,
      menu: menu_white,
      routeRight: route_right_white,
      trash: trash_white,
      turnRight: turn_right_white,
    },
    grey: {
      addChat: add_chat_grey,
      addFolder: add_folder_grey,
      arrowDown: arrow_down_grey,
      arrowLeft: arrow_left_grey,
      arrowRight: arrow_right_grey,
      arrowUp: arrow_up_grey,
      chevronDown: chevron_down,
      clip: clip_grey,
      clipboard: clipboard_grey,
      date: date_grey,
      datetime: datetime_grey,
      dots: dots_grey,
      eyeOff: eye_off_grey,
      eye: eye_grey,
      fone: fone_grey,
      info: info_grey,
      key: key_grey,
      mail: mail_grey,
      menu: menu_grey,
      routeRight: route_right_grey,
      trash: trash_grey,
      turnRight: turn_right_grey,
    },
  };

  return (
    <SvgXml xml={auxIconsList[type][icon]} width={width} height={height} />
  );
};

export default AuxIcon;
