import theme from '@app/theme';
import {notEmpty} from '@app/utils/strings';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Icon from './Icon';

interface AppInputProps extends TextInputProps {
  name: string;
  errors?: string | undefined;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  txtColor?: string;
  placeholder: string;
  value?: string | undefined;
  typePassword?: boolean;
  onChangeText?: (text: string) => void;
  clearErrorMsg?: () => void;
  showCounter?: boolean;
  ref?: any;
  showSuggestionText?: string | undefined;
  _onBlur?: (label?: string) => void;
  _onEndEditing?: (label?: string) => void;
  showClearBtn?: boolean;
  autoValidation?: boolean;
}
const AppInput: React.FC<AppInputProps> = forwardRef((props, ref) => {
  const {
    name,
    errors,
    containerStyle,
    value,
    typePassword,
    onChangeText,
    clearErrorMsg,
    maxLength,
    editable = true,
    showCounter = false,
    showSuggestionText,
    _onBlur,
    _onEndEditing,
    showClearBtn = true,
  } = props;
  const inputRef = useRef<TextInput>(null);
  const [inputText, setInputText] = useState(value || '');
  const [isFocus, setIsFocus] = useState<boolean | undefined>(false);
  const [isHide, setHide] = useState<boolean>(true);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const isFocusInput = inputRef?.current?.isFocused();
    setIsFocus(isFocusInput);
  });

  const doShow = () => {
    setHide(!isHide);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },

    blur: () => {
      inputRef?.current?.blur();
    },

    value: () => {
      return inputText;
    },
  }));

  useEffect(() => {
    clearErrorMsg?.();
    if ((value && notEmpty(value)) || (inputText && notEmpty(inputText))) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onHandleChangeText = (text: string) => {
    setInputText(text);
    onChangeText?.(text);
    clearErrorMsg?.();
  };

  const isErrors = errors && notEmpty(errors);

  const textInputColor = {
    color: isErrors
      ? theme.colors.red110
      : notEmpty(value) && editable
      ? theme.colors.base90
      : theme.colors.base60,
  };

  const dividerColor = isErrors
    ? theme.colors.red110
    : isFocus
    ? theme.colors.base90
    : theme.colors.base50;

  const onClearInput = () => {
    setInputText('');
    onChangeText?.('');
    clearErrorMsg?.();
  };

  const onBlur = (
    eventOnBlur: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setIsFocus(false);
    showSuggestionText && setShowSuggestion(false);
    props?.onBlur && props.onBlur(eventOnBlur);
    _onBlur?.(name);
    _onEndEditing?.(name);
  };

  const onFocus = (
    eventFocus: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setIsFocus(true);
    props?.onFocus && props.onFocus(eventFocus);
    showSuggestionText && setShowSuggestion(true);
  };

  const showHideIcon = typePassword && (
    <TouchableOpacity onPress={doShow} style={styles.viewIcon}>
      <Icon
        color={isHide ? theme.colors.base50 : theme.colors.red100}
        name={'app-eye'}
        testID={'common-input-show-icon'}
      />
    </TouchableOpacity>
  );

  const warningIcon = isErrors && (
    <View style={styles.viewIcon}>
      <Icon
        name="app-warning"
        color={theme.colors.red110}
        testID={'common-input-warning-icon'}
      />
    </View>
  );

  const clearButton = showClearBtn &&
    showClearButton &&
    editable &&
    isFocus && (
      <TouchableOpacity style={styles.viewIcon} onPress={onClearInput}>
        <Icon
          name={'app-close'}
          color={theme.colors.green100}
          testID={'common-input-clear-icon'}
        />
      </TouchableOpacity>
    );

  const bottomTxtContainer: StyleProp<ViewStyle> = {
    alignSelf: isErrors ? 'flex-start' : 'flex-end',
  };
  const bottomTxtErrorStyle: StyleProp<TextStyle> = {
    color: isErrors ? theme.colors.red110 : theme.colors.base90,
  };

  const bottomTextView = () => {
    return (
      <View style={[styles.textErrorContainer, bottomTxtContainer]}>
        <Text
          style={[styles.txtError, bottomTxtErrorStyle]}
          testID={'common-input-bottom-text'}>
          {isErrors || showSuggestion ? errors || showSuggestionText : ' '}
        </Text>
        {showCounter && (
          <Text
            testID={'common-input-count-text'}
            style={[styles.txtCounter]}>{`${value?.length}/${maxLength}`}</Text>
        )}
      </View>
    );
  };

  const inputContainerStyle: StyleProp<ViewStyle> = {
    borderColor: dividerColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          ref={inputRef}
          style={[styles.input, textInputColor]}
          placeholderTextColor={theme.colors.base50}
          selectionColor={theme.colors.red100}
          secureTextEntry={typePassword ? isHide : false}
          autoCapitalize={'none'}
          autoComplete={'off'}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          maxLength={maxLength}
          onChangeText={onHandleChangeText}
          {...props}
        />
        {warningIcon}
        {clearButton}
        {showHideIcon}
      </View>
      {/* <Divider color={dividerColor} testID={'common-input-divider'} /> */}
      {bottomTextView()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 200,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    paddingVertical: 12,
    paddingRight: 8,
    paddingLeft: 16,
  },
  txtError: {
    flex: 1,
    marginTop: 8,
    color: theme.colors.red110,
    fontSize: 12,
  },
  txtCounter: {
    marginTop: 8,
    color: theme.colors.base90,
    fontSize: 12,
  },
  textErrorContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
});
export default memo(AppInput);
