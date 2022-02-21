import { InterestRate } from '@aave/contract-helpers';
import { PlusSmIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Base64Token } from 'src/components/primitives/TokenIcon';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3ContextProvider';

export type SuccessTxViewProps = {
  action?: string;
  amount?: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  addToken?: ERC20TokenType;
};

export const TxSuccessView = ({
  action,
  amount,
  symbol,
  collateral,
  rate,
  addToken,
}: SuccessTxViewProps) => {
  const { addERC20Token } = useWeb3Context();
  const [base64, setBase64] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '124px',
      }}
    >
      <Box
        sx={{
          width: '48px',
          height: '48px',
          backgroundColor: '#ECF8ED99',
          borderRadius: '50%',
          mt: 14,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SvgIcon sx={{ color: 'success.main', fontSize: '32px' }}>
          <CheckIcon />
        </SvgIcon>
      </Box>

      <Typography sx={{ mt: 4 }} variant="h2">
        <Trans>All done!</Trans>
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {action && amount && symbol && (
          <Typography>
            <Trans>
              You {action} <FormattedNumber value={Number(amount)} variant="secondary14" /> {symbol}
            </Trans>
          </Typography>
        )}

        {!action && !amount && symbol && (
          <Typography>
            Your {symbol} {collateral ? 'now' : 'is not'} used as collateral
          </Typography>
        )}

        {rate && (
          <Typography>
            <Trans>
              You switched to {rate === InterestRate.Variable ? 'variable' : 'stable'} rate
            </Trans>
          </Typography>
        )}

        {addToken && (
          <Button
            variant="outlined"
            onClick={() => {
              addERC20Token({
                address: addToken.address,
                decimals: 18,
                symbol: addToken.aToken ? `a${addToken.symbol}` : addToken.symbol,
                image: `data:image/svg+xml;base64,${base64}`,
              });
            }}
            size="small"
            sx={{ mt: 6 }}
          >
            {symbol && (
              <Base64Token symbol={symbol} onImageGenerated={setBase64} aToken={addToken.aToken} />
            )}
            <Typography sx={{ display: 'inline-flex', alignItems: 'center' }} variant="buttonS">
              <SvgIcon sx={{ fontSize: '12px', mx: '2px' }}>
                <PlusSmIcon />
              </SvgIcon>
              <Trans>Add {addToken.symbol} to the wallet</Trans>
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};
