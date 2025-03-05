import { css } from '@stitches/core';
import { generateClassNames } from '@supabase/auth-ui-shared';
import { Appearance } from '../../types';

const buttonDefaultStyles = css({
  '&:disabled': {
    cursor: 'unset',
    opacity: 0.7,
  },
  alignItems: 'center',
  borderRadius: '$borderRadiusButton',
  borderStyle: 'solid',
  borderWidth: '$buttonBorderWidth',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: '$buttonFontFamily',
  fontSize: '$baseButtonSize',
  gap: '8px',
  justifyContent: 'center',
  padding: '$buttonPadding',

  transitionDuration: '100ms',
  transitionProperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  variants: {
    color: {
      default: {
        '&:hover:not(:disabled)': {
          backgroundColor: '$defaultButtonBackgroundHover',
        },
        backgroundColor: '$defaultButtonBackground',
        borderColor: '$defaultButtonBorder',
        color: '$defaultButtonText',
      },
      primary: {
        '&:hover:not(:disabled)': {
          backgroundColor: '$brandAccent',
        },
        backgroundColor: '$brand',
        borderColor: '$brandAccent',
        color: '$brandButtonText',
      },
    },
  },
  width: '100%',
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'default' | 'primary';
  loading?: boolean;
  appearance?: Appearance;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  appearance,
  icon,
  loading = false,
  ...props
}) => {
  const classNames = generateClassNames('button', buttonDefaultStyles({ color }), appearance);

  return (
    <button {...props} style={appearance?.style?.button} className={classNames.join(' ')} disabled={loading}>
      {icon}
      {children}
    </button>
  );
};

export { Button };
