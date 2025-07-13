declare module 'react-calendly' {
  interface InlineWidgetProps {
    url: string;
    styles?: {
      height?: string;
      width?: string;
    };
    pageSettings?: {
      backgroundColor?: string;
      hideEventTypeDetails?: boolean;
      hideLandingPageDetails?: boolean;
      primaryColor?: string;
      textColor?: string;
    };
  }

  export function InlineWidget(props: InlineWidgetProps): JSX.Element;
}