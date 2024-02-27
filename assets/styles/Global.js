import { StyleSheet } from 'react-native';
import { headerStyles } from './Header';
import { generalStyles } from './General';
import { formStyles } from './Form';
import { menuStyles } from './Menu';
import { profileStyles } from './Profile';
import { spinnerStyles } from './Spinner';
import { cardStyles } from './Card';
import { consultationStyles } from './Consultation';
import { loginModalStyles } from './LoginModal';
import { institutionsStyles } from './Institutions';
import { searchStyles } from './Search'

export const globalStyles =  StyleSheet.create({
  ...headerStyles,
  ...generalStyles,
  ...formStyles,
  ...menuStyles,
  ...profileStyles,
  ...spinnerStyles,
  ...cardStyles,
  ...consultationStyles,
  ...loginModalStyles,
  ...institutionsStyles,
  ...searchStyles,
})