'use client';
import { FC, useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { BlockchainData } from '@/definitions';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

interface Props {
  data: BlockchainData
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change24h: string;
  icon: React.ComponentType<any>;
}

const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  change24h,
  icon: Icon
}) => {
  const [displayValue, setDisplayValue] = useState<string | number>(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const prevValueRef = useRef<string | number>(value);
  const hasAnimatedRef = useRef(false);

  // Анимация при первой загрузке
  useEffect(() => {
    if (isInitialLoad && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setIsAnimating(true);
      
      if (typeof value === 'number' && value > 0) {
        setDisplayValue(0);
        const duration = 1500;
        const steps = 30;
        const stepValue = value / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(Math.floor(stepValue * currentStep), value);
          setDisplayValue(currentValue);
          
          if (currentStep >= steps) {
            clearInterval(interval);
            setDisplayValue(value);
            setIsAnimating(false);
            setIsInitialLoad(false);
          }
        }, duration / steps);
        
        return () => clearInterval(interval);
      } else if (typeof value === 'string' && value !== 'SOON' && value !== 'N/A' && value !== '0') {
        const numValue = parseFloat(value.replace(/,/g, ''));
        if (!isNaN(numValue) && numValue > 0) {
          setDisplayValue('0');
          const duration = 1500;
          const steps = 30;
          const stepValue = numValue / steps;
          let currentStep = 0;
          
          const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.min(Math.floor(stepValue * currentStep), numValue);
            setDisplayValue(currentValue.toLocaleString());
            
            if (currentStep >= steps) {
              clearInterval(interval);
              setDisplayValue(value);
              setIsAnimating(false);
              setIsInitialLoad(false);
            }
          }, duration / steps);
          
          return () => clearInterval(interval);
        } else {
          setDisplayValue(value);
          const timer = setTimeout(() => {
            setIsAnimating(false);
            setIsInitialLoad(false);
          }, 600);
          return () => clearTimeout(timer);
        }
      } else {
        setDisplayValue(value);
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setIsInitialLoad(false);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [isInitialLoad, value]);

  useEffect(() => {
    if (!isInitialLoad && prevValueRef.current !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
        prevValueRef.current = value;
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [value, isInitialLoad]);

  const isSoon = displayValue === 'SOON';
  const isZeroOrNA = displayValue === 0 || displayValue === 'N/A' || displayValue === '0';
  const isNegativeChange = `${change24h}`.trim().startsWith('-');
  const formattedValue = typeof displayValue === 'number' 
    ? displayValue.toLocaleString() 
    : displayValue;
  
  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.5rem', md: '0.75rem' },
        px: { xs: '1rem', md: '1.25rem' },
        py: { xs: '1rem', md: '1.25rem' },
        backgroundColor: 'rgba(17, 17, 17, 0.4)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '0.5rem', md: '0.75rem' },
        height: '100%',
        minHeight: { xs: '5.5rem', md: '6.5rem' },
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        position: 'relative',
        animation: 'cardPulse 10s ease-in-out infinite',
        '@keyframes cardPulse': {
          '0%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '10%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(122, 238, 229, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '20%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 8px rgba(122, 238, 229, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '30%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 5px rgba(122, 238, 229, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '40%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 3px rgba(122, 238, 229, 0.01), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '50%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 49, 49, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '60%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(255, 49, 49, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '70%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 49, 49, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '80%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 49, 49, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '90%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 3px rgba(255, 49, 49, 0.01), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
          '100%': {
            boxShadow:
              '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          },
        },
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(17, 17, 17, 0.6)',
          transform: 'translateY(-2px)',
          boxShadow:
            '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(122, 238, 229, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography
          sx={{
            fontSize: { xs: '0.625rem', md: '0.6875rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.1em', md: '0.12em' },
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
          }}
        >
          {title}
        </Typography>
        <Icon
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
            color: 'rgba(255,255,255,0.3)',
          }}
        />
      </Box>
      <Box>
        <Typography
          component='p'
          key={displayValue}
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            fontWeight: 300,
            color: isSoon
              ? '#7aeee5'
              : isZeroOrNA
                ? 'rgba(255, 49, 49, 0.9)'
                : '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            mb: 0.25,
            animation: isAnimating ? 'valueUpdate 0.6s ease-in-out' : 'none',
            '@keyframes valueUpdate': {
              '0%': {
                opacity: 0.3,
                transform: 'translateY(10px) scale(0.95)',
                filter: 'blur(4px)',
              },
              '50%': {
                opacity: 0.8,
                transform: 'translateY(-2px) scale(1.02)',
                filter: 'blur(0px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                filter: 'blur(0px)',
              },
            },
          }}
        >
          {formattedValue}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.625rem', md: '0.6875rem' },
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            gap: 0.25,
          }}
        >
          <Box
            component='span'
            sx={{
              color: isNegativeChange ? 'rgba(255, 49, 49, 0.9)' : '#7aeee5',
            }}
          >
            {change24h}
          </Box>
          <Box
            component='span'
            sx={{
              fontSize: { xs: '0.5625rem', md: '0.625rem' },
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            (24H)
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export const MetricsGrid: FC<Props> = ({ data }) => {
  const items: MetricCardProps[] = [
    { title: 'Total Transactions', value: data.totalTxsNumber, change24h: '+10,303,753', icon: ReceiptLongOutlinedIcon },
    { title: 'Total Staked', value: data.totalStaked, change24h: '+0.63%', icon: LockOutlinedIcon },
    { title: 'Validators', value: data.validatorsNumber, change24h: '+205', icon: HowToRegOutlinedIcon },
    { title: 'Shards', value: data.shardsNumber, change24h: '+2', icon: GridViewOutlinedIcon },
    { title: 'Epoch ID', value: data.epochId, change24h: '+1', icon: TimelapseOutlinedIcon },
    { title: 'TXS Success', value: data.txsSuccessRate, change24h: '+0.5%', icon: TaskAltOutlinedIcon },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 1.5, md: 2 },
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        height: '100%',
        // На desktop хотим ровно 2 ряда (6 карточек) и чтобы они растягивались по высоте контейнера
        gridTemplateRows: { md: 'repeat(2, 1fr)' },
        alignContent: 'stretch',
      }}
    >
      {items.map(item => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          change24h={item.change24h}
          icon={item.icon}
        />
      ))}
    </Box>
  );
};

