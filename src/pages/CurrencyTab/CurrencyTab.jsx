import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import useResponsive from '../../hooks/useResponsive';
import Currency from '../../components/Currency/Currency';
import s from './CurrencyTab.module.css';

const CurrencyTab = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  useEffect(() => {
    !isMobile && navigate('/', { replace: true });
  }, [isMobile, navigate]);

  return (
    <div className={s.wrapper}>
      <Currency />
    </div>
  );
};

export default CurrencyTab;
