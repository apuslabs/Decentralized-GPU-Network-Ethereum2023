'use client'

import Header from '@/components/header'
import './globals.css'
import { Toaster } from "sonner";
import { Roboto_Flex } from 'next/font/google'
import { PropsWithChildren, useContext } from 'react'
import { Web3ContextProvider, useWeb3Context, web3Context } from '@/contexts/web3'
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/joy'
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ConfigProvider } from 'antd'
import { antdTheme } from './theme';
import Script from 'next/script';

const robotoFlex = Roboto_Flex({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

function ProviderContext({ children }: PropsWithChildren) {
  const web3Context = useWeb3Context()

  return <>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/web3/4.0.1-alpha.5/web3.min.js" onReady={web3Context.initWeb3} />
    <StyledEngineProvider injectFirst><Web3ContextProvider value={web3Context}>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => `
        [data-sonner-toaster][data-theme] {
          font-family: ${theme.vars.fontFamily.body};
          font-size: ${theme.fontSize.md};
          --border-radius: ${theme.vars.radius.sm};
          --normal-bg: ${theme.vars.palette.background.surface};
          --normal-border: ${theme.vars.palette.divider};
          --normal-text: ${theme.vars.palette.text.primary};
          --success-bg: ${theme.vars.palette.success.softBg};
          --success-border: rgb(${theme.vars.palette.success.mainChannel} / 0.2);
          --success-text: ${theme.vars.palette.success.softColor};
          --error-bg: ${theme.vars.palette.danger.softBg};
          --error-border: rgb(${theme.vars.palette.danger.mainChannel} / 0.2);
          --error-text: ${theme.vars.palette.danger.softColor};
          --gray1: ${theme.vars.palette.neutral[50]};
          --gray2: ${theme.vars.palette.neutral[100]};
          --gray3: ${theme.vars.palette.neutral[200]};
          --gray4: ${theme.vars.palette.neutral[300]};
          --gray5: ${theme.vars.palette.neutral[400]};
          --gray6: ${theme.vars.palette.neutral[500]};
          --gray7: ${theme.vars.palette.neutral[600]};
          --gray8: ${theme.vars.palette.neutral[700]};
          --gray9: ${theme.vars.palette.neutral[800]};
          --gray10: ${theme.vars.palette.neutral[900]};
        }
        &.sonner-toast-warn {
          --normal-bg: ${theme.vars.palette.warning.softBg};
          --normal-border: rgb(${theme.vars.palette.warning.mainChannel} / 0.2);
          --normal-text: ${theme.vars.palette.warning.softColor};
        }
      `}
      />
      <StyledComponentsRegistry>
        <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
      </StyledComponentsRegistry>
      <Toaster position="top-center" richColors closeButton />
    </Web3ContextProvider></StyledEngineProvider></>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" id="app">
      <body className={robotoFlex.className}>
        <ProviderContext>{children}</ProviderContext>
      </body>
    </html>
  )
}
